import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';
import { SidedIconComponentComponent } from '../../../shared-components/sided-icon-component/sided-icon-component.component';
import { RouterLink } from '@angular/router';
import { ERoutes } from '../../../../core/enums/routes.enum';
import { IBlog } from '../../../../models/blog.interface';
import { WebsiteStoreQuery } from '../../../../store/websiteStore/website-store.query';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-box-component',
  standalone: true,
  imports: [BaseImageComponentComponent, SidedIconComponentComponent, RouterLink, DatePipe],
  templateUrl: './blog-box-component.component.html',
  styleUrl: './blog-box-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogBoxComponentComponent {
  websiteStoreQuery = inject(WebsiteStoreQuery);
  blogTitle = input.required<string>();
  blogImg = input.required<string>();
  blogDate = input.required<string>();
  blogSlug = input.required<string>();
  get ERoutes(){
    return ERoutes
  }
}
