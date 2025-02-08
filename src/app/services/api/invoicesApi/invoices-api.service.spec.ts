import { TestBed } from '@angular/core/testing';

import { InvoicesApiService } from './invoices-api.service';

describe('InvoicesApiService', () => {
  let service: InvoicesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
