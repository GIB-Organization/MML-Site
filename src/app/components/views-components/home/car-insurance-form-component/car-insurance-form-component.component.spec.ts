import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceFormComponentComponent } from './car-insurance-form-component.component';

describe('CarInsuranceFormComponentComponent', () => {
  let component: CarInsuranceFormComponentComponent;
  let fixture: ComponentFixture<CarInsuranceFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInsuranceFormComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarInsuranceFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
