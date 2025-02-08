import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGoalsComponentComponent } from './company-goals-component.component';

describe('CompanyGoalsComponentComponent', () => {
  let component: CompanyGoalsComponentComponent;
  let fixture: ComponentFixture<CompanyGoalsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyGoalsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyGoalsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
