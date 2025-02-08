import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPalletComponentComponent } from './car-pallet-component.component';

describe('CarPalletComponentComponent', () => {
  let component: CarPalletComponentComponent;
  let fixture: ComponentFixture<CarPalletComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPalletComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarPalletComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
