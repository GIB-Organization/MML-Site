import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionMessageComponentComponent } from './vision-message-component.component';

describe('VisionMessageComponentComponent', () => {
  let component: VisionMessageComponentComponent;
  let fixture: ComponentFixture<VisionMessageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionMessageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisionMessageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
