import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSingleViewComponent } from './blog-single-view.component';

describe('BlogSingleViewComponent', () => {
  let component: BlogSingleViewComponent;
  let fixture: ComponentFixture<BlogSingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSingleViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
