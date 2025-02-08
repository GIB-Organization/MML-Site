import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { insuranceStepsGuard } from './insurance-steps.guard';

describe('insuranceStepsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => insuranceStepsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
