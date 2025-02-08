import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyStepsComponentComponent } from './apply-steps-component.component';

describe('ApplyStepsComponentComponent', () => {
  let component: ApplyStepsComponentComponent;
  let fixture: ComponentFixture<ApplyStepsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyStepsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyStepsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
