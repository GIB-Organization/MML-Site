import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { EQueryParams } from '../../enums/routes.enum';

/**
 * Navigation convenience only: the server still checks every request (VULN-071). A session that was restored on load (APP_INITIALIZER)
 * is already in the store when the first route is checked, so a reload on a private page does not bounce.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authStoreQuery: AuthStoreQuery) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authStoreQuery.isAuthenticated) return true;
    // come back to the page after signing in (path only: the query string is not carried over)
    const path = state.url.split('?')[0].split('#')[0];
    return this.router.createUrlTree(['/'], path && path !== '/' ? { queryParams: { [EQueryParams.redirectTo]: path } } : {});
  }
}
