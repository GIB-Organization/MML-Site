import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTabsComponentComponent } from './insurance-tabs-component.component';

describe('InsuranceTabsComponentComponent', () => {
  let component: InsuranceTabsComponentComponent;
  let fixture: ComponentFixture<InsuranceTabsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceTabsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceTabsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
