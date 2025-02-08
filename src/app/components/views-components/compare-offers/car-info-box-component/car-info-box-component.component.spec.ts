import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInfoBoxComponentComponent } from './car-info-box-component.component';

describe('CarInfoBoxComponentComponent', () => {
  let component: CarInfoBoxComponentComponent;
  let fixture: ComponentFixture<CarInfoBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInfoBoxComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarInfoBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
