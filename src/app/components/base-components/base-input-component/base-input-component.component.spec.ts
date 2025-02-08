import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInputComponentComponent } from './base-input-component.component';

describe('BaseInputComponentComponent', () => {
  let component: BaseInputComponentComponent;
  let fixture: ComponentFixture<BaseInputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseInputComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
