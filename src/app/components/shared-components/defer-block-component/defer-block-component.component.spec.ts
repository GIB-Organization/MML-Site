import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferBlockComponentComponent } from './defer-block-component.component';

describe('DeferBlockComponentComponent', () => {
  let component: DeferBlockComponentComponent;
  let fixture: ComponentFixture<DeferBlockComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferBlockComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferBlockComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
