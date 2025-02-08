import { TestBed } from '@angular/core/testing';

import { IslamicDateService } from './islamic-date.service';

describe('IslamicDateService', () => {
  let service: IslamicDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IslamicDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
