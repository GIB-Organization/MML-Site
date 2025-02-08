import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncompletedOrdersViewComponent } from './uncompleted-orders-view.component';

describe('UncompletedOrdersViewComponent', () => {
  let component: UncompletedOrdersViewComponent;
  let fixture: ComponentFixture<UncompletedOrdersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UncompletedOrdersViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UncompletedOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
