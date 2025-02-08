import { TestBed } from '@angular/core/testing';

import { GregorianDateService } from './gregorian-date.service';

describe('GregorianDateService', () => {
  let service: GregorianDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GregorianDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
