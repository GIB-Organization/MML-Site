import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareOffersComponent } from './compare-offers.component';

describe('CompareOffersComponent', () => {
  let component: CompareOffersComponent;
  let fixture: ComponentFixture<CompareOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompareOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
