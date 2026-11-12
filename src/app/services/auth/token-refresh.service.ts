import { Injectable, inject } from '@angular/core';
import { Observable, finalize, map, of, shareReplay, throwError } from 'rxjs';
import { AuthApiService } from '../api/authApi/auth-api.service';
import { AuthStoreQuery } from '../../store/authStore/auth-store.query';
import { ILoginResponse, IRefreshTokenDTO } from '../../models/auth.interface';
import { IResponse } from '../../models/response.interface';
import { SessionLifecycleService } from '../core/session/session-lifecycle.service';

/** There is no refresh token to trade, so the session cannot continue. */
export class SessionExpiredError extends Error {
  constructor() { super('SESSION_EXPIRED'); this.name = 'SessionExpiredError'; }
}

/** The session ended (sign-out) while a refresh was running; its answer was thrown away. Not an expiry: nothing more to do. */
export class SessionEndedError extends Error {
  constructor() { super('SESSION_ENDED'); this.name = 'SessionEndedError'; }
}

/**
 * The one place that refreshes the access token (VULN-068). The refresh token is single use (VULN-017), so parallel 401s must share
 * ONE call: a second use of the same token looks like theft. Every waiting request is replayed once with the new access token.
 */
@Injectable({ providedIn: 'root' })
export class TokenRefreshService {
  #api = inject(AuthApiService);
  #query = inject(AuthStoreQuery);
  #session = inject(SessionLifecycleService);
  #inflight$: Observable<string> | null = null;

  /**
   * @param failedBearer the Authorization header of the request that got the 401, so a request that was in flight while another one
   *   refreshed is simply replayed with the current token instead of refreshing again.
   * @returns the new access token
   */
  refresh(failedBearer?: string | null): Observable<string> {
    const latest = this.#query.token?.accessToken;
    if (latest && failedBearer && failedBearer !== `Bearer ${latest}`) return of(latest);

    if (!this.#inflight$) {
      const tokens = this.#query.token;
      if (!tokens?.refreshToken) return throwError(() => new SessionExpiredError());

      // the session this refresh belongs to; if it ends before the answer arrives, the answer must not sign the user in again (VULN-067)
      const epoch = this.#session.epoch();
      this.#inflight$ = this.#api.refreshToken(tokens).pipe(
        map((res: IResponse<IRefreshTokenDTO>) => {
          if (this.#session.epoch() !== epoch) throw new SessionEndedError();
          const user: ILoginResponse = { ...this.#query.user, token: res.result };
          this.#query.setUser = user;
          return res.result.accessToken;
        }),
        finalize(() => { this.#inflight$ = null; }),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.#inflight$;
  }
}
