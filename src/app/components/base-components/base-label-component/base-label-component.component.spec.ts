import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLabelComponentComponent } from './base-label-component.component';

describe('BaseLabelComponentComponent', () => {
  let component: BaseLabelComponentComponent;
  let fixture: ComponentFixture<BaseLabelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseLabelComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseLabelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
