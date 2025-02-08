import { ChangeDetectionStrategy, Component, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseImageComponentComponent } from '../../components/base-components/base-image-component/base-image-component.component';
import { SidedIconComponentComponent } from '../../components/shared-components/sided-icon-component/sided-icon-component.component';
import { WebsiteStoreService } from '../../store/websiteStore/website-store.service';
import { WebsiteStoreQuery } from '../../store/websiteStore/website-store.query';
import { DatePipe } from '@angular/common';
import { LoadingContentComponentComponent } from '../../components/shared-components/loading-content-component/loading-content-component.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-single-view',
  standalone: true,
  imports: [BaseImageComponentComponent, SidedIconComponentComponent, DatePipe, LoadingContentComponentComponent],
  templateUrl: './blog-single-view.component.html',
  styleUrl: './blog-single-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
})
export class BlogSingleViewComponent implements OnInit{
  slug = input<string>('')
  title = inject(Title)
  sanitizer = inject(DomSanitizer)
  websiteStoreService = inject(WebsiteStoreService)
  websiteStoreQuery = inject(WebsiteStoreQuery)
  blog = toSignal(this.websiteStoreQuery.blog$);
  isLoading = toSignal(this.websiteStoreQuery.selectLoading())

  ngOnInit(): void {
    this.websiteStoreService.getBlogBySlug(this.slug(), ()=> this.title.setTitle(this.blog()?.[this.websiteStoreQuery.blogTitleKey]??''));
  }
}
