import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySpeedRateComponent } from './company-speed-rate.component';

describe('CompanySpeedRateComponent', () => {
  let component: CompanySpeedRateComponent;
  let fixture: ComponentFixture<CompanySpeedRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanySpeedRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySpeedRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
