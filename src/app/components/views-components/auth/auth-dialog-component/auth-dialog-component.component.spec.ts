import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponentComponent } from './auth-dialog-component.component';

describe('AuthDialogComponentComponent', () => {
  let component: AuthDialogComponentComponent;
  let fixture: ComponentFixture<AuthDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
