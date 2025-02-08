import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCompanyComponentComponent } from './about-company-component.component';

describe('AboutCompanyComponentComponent', () => {
  let component: AboutCompanyComponentComponent;
  let fixture: ComponentFixture<AboutCompanyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCompanyComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutCompanyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
