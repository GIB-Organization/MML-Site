import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTooltipComponentComponent } from './base-tooltip-component.component';

describe('BaseTooltipComponentComponent', () => {
  let component: BaseTooltipComponentComponent;
  let fixture: ComponentFixture<BaseTooltipComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTooltipComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseTooltipComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
