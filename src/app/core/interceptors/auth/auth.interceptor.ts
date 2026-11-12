import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { BASE_URL_TOKEN } from '../../injection-tokens/base-url.token';
import { isApiRequest, isAuthFree } from '../../utils/isApiRequest';
import { withAuth, withDefaultHeaders } from '../../utils/setHttpHeaders';

/**
 * VULN-066: the access token goes only to our own API, only when there is one, and never to the public sign-in routes.
 * Server-side rendering never carries a user's token.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthStoreQuery).token?.accessToken;
  const baseUrl = inject(BASE_URL_TOKEN);
  const onServer = isPlatformServer(inject(PLATFORM_ID));

  if (!token || onServer || !isApiRequest(req.url, baseUrl) || isAuthFree(req.url)) {
    return next(withDefaultHeaders(req));
  }
  return next(withDefaultHeaders(withAuth(req, token)));
};
