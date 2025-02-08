import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAlertComponentComponent } from './base-alert-component.component';

describe('BaseAlertComponentComponent', () => {
  let component: BaseAlertComponentComponent;
  let fixture: ComponentFixture<BaseAlertComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseAlertComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseAlertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
