import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMainDataComponentComponent } from './change-main-data-component.component';

describe('ChangeMainDataComponentComponent', () => {
  let component: ChangeMainDataComponentComponent;
  let fixture: ComponentFixture<ChangeMainDataComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeMainDataComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeMainDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
