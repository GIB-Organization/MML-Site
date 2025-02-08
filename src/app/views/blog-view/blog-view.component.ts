import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BlogBoxComponentComponent } from '../../components/views-components/blog/blog-box-component/blog-box-component.component';
import { Pagination } from '../../core/classes/Pagination';
import { IPagination } from '../../models/layout-models/pagination.interface';
import { WebsiteStoreService } from '../../store/websiteStore/website-store.service';
import { WebsiteStoreQuery } from '../../store/websiteStore/website-store.query';
import { Meta, Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmptyDataComponentComponent } from '../../components/shared-components/empty-data-component/empty-data-component.component';
import { LoadingContentComponentComponent } from '../../components/shared-components/loading-content-component/loading-content-component.component';
import { PaginatorComponentComponent } from '../../components/layout-components/paginator-component/paginator-component.component';
import { SettingsQuery } from '../../store/settings/settings.query';
@Component({
  selector: 'app-blog-view',
  standalone: true,
  imports: [TranslateModule, BlogBoxComponentComponent, PaginatorComponentComponent, EmptyDataComponentComponent, LoadingContentComponentComponent ],
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogViewComponent implements OnInit{
  pagination:IPagination = new Pagination();
  websiteStoreService = inject(WebsiteStoreService)
  websiteStoreQuery = inject(WebsiteStoreQuery)
  settingsQuery = inject(SettingsQuery)
  title = inject(Title);
  translateService = inject(TranslateService);
  meta = inject(Meta);
  blogs = toSignal(this.websiteStoreQuery.blogs$);
  isLoading = toSignal(this.websiteStoreQuery.selectLoading());
  
  ngOnInit(): void {
    this.getBlogs(this.pagination)
    this.title.setTitle(this.settingsQuery.seoSettings?.blogsTitle??'')
    this.meta.updateTag({ name: 'description', content: this.settingsQuery.seoSettings?.blogsDescription??'' });
  }

  getBlogs(e:IPagination){
    this.websiteStoreService.getAllBlogs(e);
  }
}
