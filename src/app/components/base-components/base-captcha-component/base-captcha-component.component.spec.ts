import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCaptchaComponentComponent } from './base-captcha-component.component';
describe('BaseCaptchaComponentComponent', () => {
  let component: BaseCaptchaComponentComponent;
  let fixture: ComponentFixture<BaseCaptchaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCaptchaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseCaptchaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
