import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFormComponentComponent } from './driver-form-component.component';

describe('DriverFormComponentComponent', () => {
  let component: DriverFormComponentComponent;
  let fixture: ComponentFixture<DriverFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverFormComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
