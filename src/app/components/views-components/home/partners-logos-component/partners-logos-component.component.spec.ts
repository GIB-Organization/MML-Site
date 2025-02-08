import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersLogosComponentComponent } from './partners-logos-component.component';

describe('PartnersLogosComponentComponent', () => {
  let component: PartnersLogosComponentComponent;
  let fixture: ComponentFixture<PartnersLogosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersLogosComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersLogosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
