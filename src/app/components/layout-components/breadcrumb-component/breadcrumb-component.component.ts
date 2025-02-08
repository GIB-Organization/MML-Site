import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbService } from '../../../services/core/breadcrumb/breadcrumb.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-breadcrumb-component',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './breadcrumb-component.component.html',
  styleUrl: './breadcrumb-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponentComponent implements OnInit {
  public destroyRef = inject(DestroyRef);
  constructor(public breadcrumbService: BreadcrumbService) { }

  ngOnInit(){
    this.breadcrumbService.startBuildingBreadcrumbs(this.destroyRef); // Start building on component load
  }

}
