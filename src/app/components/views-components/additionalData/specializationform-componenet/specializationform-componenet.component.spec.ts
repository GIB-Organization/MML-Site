import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationformComponenetComponent } from './specializationform-componenet.component';

describe('SpecializationformComponenetComponent', () => {
  let component: SpecializationformComponenetComponent;
  let fixture: ComponentFixture<SpecializationformComponenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationformComponenetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecializationformComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
