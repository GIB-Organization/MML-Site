import { TestBed } from '@angular/core/testing';

import { DateFactoryService } from './date-factory.service';

describe('DateFactoryService', () => {
  let service: DateFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
