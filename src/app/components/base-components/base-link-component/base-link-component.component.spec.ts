import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLinkComponentComponent } from './base-link-component.component';

describe('BaseLinkComponentComponent', () => {
  let component: BaseLinkComponentComponent;
  let fixture: ComponentFixture<BaseLinkComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseLinkComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseLinkComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
