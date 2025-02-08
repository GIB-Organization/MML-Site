import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowBoxComponentComponent } from './shadow-box-component.component';

describe('ShadowBoxComponentComponent', () => {
  let component: ShadowBoxComponentComponent;
  let fixture: ComponentFixture<ShadowBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowBoxComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShadowBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
