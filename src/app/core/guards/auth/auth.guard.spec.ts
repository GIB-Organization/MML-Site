import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { makeJwt } from '../../utils/jwt.spec';
import { AuthGuard } from './auth.guard';

// VULN-071
describe('AuthGuard', () => {
  const state = (url: string) => ({ url }) as RouterStateSnapshot;
  let guard: AuthGuard;
  let query: AuthStoreQuery;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
    query = TestBed.inject(AuthStoreQuery);
    router = TestBed.inject(Router);
  });

  const withToken = (accessToken: string) => spyOnProperty(query, 'token', 'get').and.returnValue({ accessToken, refreshToken: 'r' } as any);
  const ask = (url: string) => guard.canActivate({} as any, state(url));

  it('lets a signed-in customer through', () => {
    withToken(makeJwt({ exp: Math.floor(Date.now() / 1000) + 3600 }));
    expect(ask('/profile')).toBeTrue();
  });

  it('T071-03 an expired token is sent home and the page is remembered', () => {
    withToken(makeJwt({ exp: Math.floor(Date.now() / 1000) - 10 }));
    const result = ask('/profile?tab=2') as UrlTree;
    expect(router.serializeUrl(result)).toBe('/?redirectTo=%2Fprofile');
  });

  it('no token and a malformed token are refused', () => {
    expect(ask('/profile') instanceof UrlTree).toBeTrue();
    withToken('garbage');
    expect(ask('/profile') instanceof UrlTree).toBeTrue();
  });

  it('the home page itself carries no redirect', () => {
    expect(router.serializeUrl(ask('/') as UrlTree)).toBe('/');
  });
});
