import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBannerComponentComponent } from './about-banner-component.component';

describe('AboutBannerComponentComponent', () => {
  let component: AboutBannerComponentComponent;
  let fixture: ComponentFixture<AboutBannerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutBannerComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutBannerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
