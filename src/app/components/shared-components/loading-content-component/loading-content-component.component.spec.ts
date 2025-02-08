import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingContentComponentComponent } from './loading-content-component.component';

describe('LoadingContentComponentComponent', () => {
  let component: LoadingContentComponentComponent;
  let fixture: ComponentFixture<LoadingContentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingContentComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingContentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
