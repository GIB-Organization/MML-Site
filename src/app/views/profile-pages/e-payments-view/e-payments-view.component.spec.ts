import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPaymentsViewComponent } from './e-payments-view.component';

describe('EPaymentsViewComponent', () => {
  let component: EPaymentsViewComponent;
  let fixture: ComponentFixture<EPaymentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EPaymentsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EPaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
