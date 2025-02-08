import { TestBed } from '@angular/core/testing';

import { InsuranceInquireApiService } from './insurance-inquire-api.service';

describe('InsuranceInquireApiService', () => {
  let service: InsuranceInquireApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceInquireApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
