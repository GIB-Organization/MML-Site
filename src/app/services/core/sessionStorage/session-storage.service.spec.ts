import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';
import { EStorageEnum } from '../../../core/enums/storage.enum';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('stores, reads and removes a value in session storage only', () => {
    service.setStorageElement(EStorageEnum.refreshToken, 'r1');
    expect(sessionStorage.getItem(EStorageEnum.refreshToken)).toBe('r1');
    expect(localStorage.getItem(EStorageEnum.refreshToken)).toBeNull();
    expect(service.getStorageElement(EStorageEnum.refreshToken)).toBe('r1');

    service.removeStorageElement(EStorageEnum.refreshToken);
    expect(service.getStorageElement(EStorageEnum.refreshToken)).toBeNull();
  });

  it('does not throw when the browser blocks storage', () => {
    spyOn(Storage.prototype, 'setItem').and.throwError('blocked');
    expect(() => service.setStorageElement(EStorageEnum.refreshToken, 'x')).not.toThrow();
  });
});
