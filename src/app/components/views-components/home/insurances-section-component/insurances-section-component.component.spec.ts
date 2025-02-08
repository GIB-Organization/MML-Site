import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesSectionComponentComponent } from './insurances-section-component.component';

describe('InsurancesSectionComponentComponent', () => {
  let component: InsurancesSectionComponentComponent;
  let fixture: ComponentFixture<InsurancesSectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesSectionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesSectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
