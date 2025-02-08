import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFormComponentComponent } from './owner-form-component.component';

describe('OwnerFormComponentComponent', () => {
  let component: OwnerFormComponentComponent;
  let fixture: ComponentFixture<OwnerFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerFormComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
