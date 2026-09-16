import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WebsiteApiService } from '../../services/api/websiteApi/website-api.service';
import { IPartner } from '../../models/partner.interface';
import { BaseImageComponentComponent } from '../../components/base-components/base-image-component/base-image-component.component';
import { SidedIconComponentComponent } from '../../components/shared-components/sided-icon-component/sided-icon-component.component';

@Component({
  selector: 'app-partners-view',
  standalone: true,
  imports: [TranslateModule, BaseImageComponentComponent, SidedIconComponentComponent],
  templateUrl: './partners-view.component.html',
  styleUrl: './partners-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersViewComponent implements OnInit {
  #websiteApi = inject(WebsiteApiService);
  #ref = inject(DestroyRef);
  partners = signal<IPartner[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.#websiteApi.getAllPartners().pipe(takeUntilDestroyed(this.#ref)).subscribe({
      next: (res) => {
        this.partners.set(res.result ?? []);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
