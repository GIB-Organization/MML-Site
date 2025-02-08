import { TestBed } from '@angular/core/testing';

import { PoliciesApiService } from './policies-api.service';

describe('PoliciesApiService', () => {
  let service: PoliciesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliciesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
