import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDataViewComponent } from './additional-data-view.component';

describe('AdditionalDataViewComponent', () => {
  let component: AdditionalDataViewComponent;
  let fixture: ComponentFixture<AdditionalDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalDataViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
