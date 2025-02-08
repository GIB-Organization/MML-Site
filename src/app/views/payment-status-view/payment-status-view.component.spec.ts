import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusViewComponent } from './payment-status-view.component';

describe('PaymentStatusViewComponent', () => {
  let component: PaymentStatusViewComponent;
  let fixture: ComponentFixture<PaymentStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
