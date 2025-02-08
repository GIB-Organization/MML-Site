import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDataComponentComponent } from './empty-data-component.component';

describe('EmptyDataComponentComponent', () => {
  let component: EmptyDataComponentComponent;
  let fixture: ComponentFixture<EmptyDataComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyDataComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
