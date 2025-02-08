import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsViewComponent } from './terms-conditions-view.component';

describe('TermsConditionsViewComponent', () => {
  let component: TermsConditionsViewComponent;
  let fixture: ComponentFixture<TermsConditionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsConditionsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsConditionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
