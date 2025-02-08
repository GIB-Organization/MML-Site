import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountFormComponentComponent } from './discount-form-component.component';

describe('DiscountFormComponentComponent', () => {
  let component: DiscountFormComponentComponent;
  let fixture: ComponentFixture<DiscountFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountFormComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
