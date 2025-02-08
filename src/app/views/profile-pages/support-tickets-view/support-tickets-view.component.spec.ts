import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketsViewComponent } from './support-tickets-view.component';

describe('SupportTicketsViewComponent', () => {
  let component: SupportTicketsViewComponent;
  let fixture: ComponentFixture<SupportTicketsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportTicketsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportTicketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
