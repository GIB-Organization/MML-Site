import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { SessionLifecycleService } from '../../../services/core/session/session-lifecycle.service';

/**
 * VULN-067: a request that carried the user's token is dropped when the session ends, so a response that arrives after logout
 * cannot fill a store again. Place it after the auth interceptor (it looks for the Authorization header) and before the ones that retry.
 * The sign-out call itself must finish, so it is left alone.
 */
export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.headers.has('Authorization') || req.url.toLowerCase().split('?')[0].endsWith('/account/logout')) return next(req);
  return next(req).pipe(takeUntil(inject(SessionLifecycleService).ended$));
};
