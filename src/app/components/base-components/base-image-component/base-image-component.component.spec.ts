import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseImageComponentComponent } from './base-image-component.component';

describe('BaseImageComponentComponent', () => {
  let component: BaseImageComponentComponent;
  let fixture: ComponentFixture<BaseImageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseImageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseImageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
