import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceStepsLayoutComponent } from './insurance-steps-layout.component';

describe('InsuranceStepsLayoutComponent', () => {
  let component: InsuranceStepsLayoutComponent;
  let fixture: ComponentFixture<InsuranceStepsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceStepsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceStepsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
