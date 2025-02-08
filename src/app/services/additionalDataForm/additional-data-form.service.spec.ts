import { TestBed } from '@angular/core/testing';

import { AdditionalDataFormService } from './additional-data-form.service';

describe('AdditionalDataFormService', () => {
  let service: AdditionalDataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalDataFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
