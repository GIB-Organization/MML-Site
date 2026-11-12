import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ErrorCodes } from '../../enums';
import { SessionEndedError, SessionExpiredError, TokenRefreshService } from '../../../services/auth/token-refresh.service';
import { UnAuthorizedErrorResponse } from '../../classes/ErrorHandling';
import { BASE_URL_TOKEN } from '../../injection-tokens/base-url.token';
import { isApiRequest, isAuthFree } from '../../utils/isApiRequest';
import { withAuth } from '../../utils/setHttpHeaders';
import { REPLAYED } from './refresh-context';

/**
 * A 401 on a request that carried the user's token is answered with ONE shared refresh (TokenRefreshService) and a single replay
 * (VULN-068). It never runs for requests that had no session, for the public sign-in routes, for other hosts, or for a request
 * that is already a replay. A failed refresh ends the session once: the error handler does it for the refresh call itself
 * (toast and sign-out), this interceptor only does it when there was no refresh token to try.
 */
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const refresher = inject(TokenRefreshService);
  // looked up only when a session has to end: AuthStoreService is being built when the first requests of the app go out (VULN-064 start-up), so asking for it here would be circular
  const injector = inject(Injector);
  const bases = [inject(BASE_URL_TOKEN)];

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const sentBearer = req.headers.get('Authorization');
      const eligible = error?.status === ErrorCodes.unauthorized && !!sentBearer && !req.context.get(REPLAYED)
        && isApiRequest(req.url, ...bases) && !isAuthFree(req.url);
      if (!eligible) return throwError(() => error);

      return refresher.refresh(sentBearer).pipe(
        catchError((refreshError) => {
          if (refreshError instanceof SessionExpiredError) injector.get(UnAuthorizedErrorResponse).handleErrorResponse(error);
          // the caller gets the 401 it was given (a real HttpErrorResponse), never a copy that lost its type
          return throwError(() => (refreshError instanceof SessionEndedError ? refreshError : error));
        }),
        // the replay sits outside the handler above: its own errors reach the caller unchanged
        switchMap((accessToken) => next(withAuth(req.clone({ context: req.context.set(REPLAYED, true) }), accessToken)))
      );
    })
  );
};
