import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { EStorageEnum } from '../../core/enums/storage.enum';

describe('AuthService (VULN-064)', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('keeps only the refresh token, in session storage, and nothing in local storage', () => {
    service.saveRefresh({ accessToken: 'header.payload.sig', refreshToken: 'refresh-1' });

    expect(sessionStorage.getItem(EStorageEnum.refreshToken)).toBe('refresh-1');
    expect(service.getRefresh()).toBe('refresh-1');
    expect(localStorage.length).toBe(0);
    for (let i = 0; i < sessionStorage.length; i++) {
      expect(sessionStorage.getItem(sessionStorage.key(i)!)).not.toContain('header.payload.sig');
    }
  });

  it('removes the token and profile that earlier releases left in local storage', () => {
    localStorage.setItem(EStorageEnum.token, '{"accessToken":"a","refreshToken":"r"}');
    localStorage.setItem(EStorageEnum.user, '{"nationalId":"1012345678","iban":"SA00"}');

    service.purgeLegacy();

    expect(localStorage.getItem(EStorageEnum.token)).toBeNull();
    expect(localStorage.getItem(EStorageEnum.user)).toBeNull();
  });

  it('does not touch the public settings caches', () => {
    localStorage.setItem(EStorageEnum.generalSettings, '{"a":1}');
    service.purgeLegacy();
    expect(localStorage.getItem(EStorageEnum.generalSettings)).toBe('{"a":1}');
  });

  it('logout clears the refresh token and any legacy keys', () => {
    service.saveRefresh({ accessToken: 'a', refreshToken: 'r' });
    localStorage.setItem(EStorageEnum.user, '{}');

    service.logout();

    expect(service.getRefresh()).toBeNull();
    expect(service.hasStoredSession()).toBeFalse();
    expect(localStorage.getItem(EStorageEnum.user)).toBeNull();
  });

  it('ignores a token without a refresh token', () => {
    service.saveRefresh(undefined);
    service.saveRefresh({ accessToken: 'a', refreshToken: '' });
    expect(service.getRefresh()).toBeNull();
  });
});
