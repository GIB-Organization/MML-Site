import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlineTitleComponentComponent } from './underline-title-component.component';

describe('UnderlineTitleComponentComponent', () => {
  let component: UnderlineTitleComponentComponent;
  let fixture: ComponentFixture<UnderlineTitleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderlineTitleComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderlineTitleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
