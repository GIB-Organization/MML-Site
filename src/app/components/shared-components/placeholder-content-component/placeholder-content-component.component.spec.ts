import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderContentComponentComponent } from './placeholder-content-component.component';

describe('PlaceholderContentComponentComponent', () => {
  let component: PlaceholderContentComponentComponent;
  let fixture: ComponentFixture<PlaceholderContentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderContentComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceholderContentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
