import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidationAlertComponentComponent } from './input-validation-alert-component.component';

describe('InputValidationAlertComponentComponent', () => {
  let component: InputValidationAlertComponentComponent;
  let fixture: ComponentFixture<InputValidationAlertComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputValidationAlertComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputValidationAlertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
