import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationBoxComponent } from './quotation-box.component';

describe('QuotationBoxComponent', () => {
  let component: QuotationBoxComponent;
  let fixture: ComponentFixture<QuotationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
