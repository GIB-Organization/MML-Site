import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBoxComponentComponent } from './title-box-component.component';

describe('TitleBoxComponentComponent', () => {
  let component: TitleBoxComponentComponent;
  let fixture: ComponentFixture<TitleBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleBoxComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
