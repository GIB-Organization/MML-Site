import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterContactComponentComponent } from './footer-contact-component.component';

describe('FooterContactComponentComponent', () => {
  let component: FooterContactComponentComponent;
  let fixture: ComponentFixture<FooterContactComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterContactComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterContactComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
