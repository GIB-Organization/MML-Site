import { TestBed } from '@angular/core/testing';

import { OtpStrategyService } from './otp-strategy.service';

describe('OtpStrategyService', () => {
  let service: OtpStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
