import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFilterComponent } from './quotations-filter.component';

describe('QuotationsFilterComponent', () => {
  let component: QuotationsFilterComponent;
  let fixture: ComponentFixture<QuotationsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotationsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
