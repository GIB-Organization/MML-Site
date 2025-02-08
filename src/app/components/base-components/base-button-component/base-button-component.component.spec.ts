import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseButtonComponentComponent } from './base-button-component.component';

describe('BaseButtonComponentComponent', () => {
  let component: BaseButtonComponentComponent;
  let fixture: ComponentFixture<BaseButtonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseButtonComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseButtonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
