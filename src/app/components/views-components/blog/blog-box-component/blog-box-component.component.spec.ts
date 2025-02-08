import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBoxComponentComponent } from './blog-box-component.component';

describe('BlogBoxComponentComponent', () => {
  let component: BlogBoxComponentComponent;
  let fixture: ComponentFixture<BlogBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogBoxComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
