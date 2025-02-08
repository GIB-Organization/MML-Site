import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyBoxComponent } from './policy-box.component';

describe('PolicyBoxComponent', () => {
  let component: PolicyBoxComponent;
  let fixture: ComponentFixture<PolicyBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolicyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
