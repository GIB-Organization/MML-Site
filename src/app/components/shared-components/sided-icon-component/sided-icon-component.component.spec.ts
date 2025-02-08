import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidedIconComponentComponent } from './sided-icon-component.component';

describe('SidedIconComponentComponent', () => {
  let component: SidedIconComponentComponent;
  let fixture: ComponentFixture<SidedIconComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidedIconComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidedIconComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
