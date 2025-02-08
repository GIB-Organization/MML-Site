import { ApplyStepsComponentComponent } from './../../components/views-components/home/apply-steps-component/apply-steps-component.component';
import { PartnersLogosComponentComponent } from '../../components/views-components/home/partners-logos-component/partners-logos-component.component';
import { InsurancesSectionComponentComponent } from './../../components/views-components/home/insurances-section-component/insurances-section-component.component';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FaqsComponentComponent } from '../../components/views-components/home/faqs-component/faqs-component.component';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { WebsiteStoreService } from '../../store/websiteStore/website-store.service';
import { WebsiteStoreQuery } from '../../store/websiteStore/website-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsQuery } from '../../store/settings/settings.query';
import { DeferBlockComponentComponent } from "../../components/shared-components/defer-block-component/defer-block-component.component";
@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    FaqsComponentComponent,
    DeferBlockComponentComponent,
    ApplyStepsComponentComponent,
    PartnersLogosComponentComponent,
    InsurancesSectionComponentComponent
],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit{
  title = inject(Title);
  translateService = inject(TranslateService);
  meta = inject(Meta);
  websiteStoreService = inject(WebsiteStoreService);
  websiteStoreQuery = inject(WebsiteStoreQuery);
  faqs = toSignal(this.websiteStoreQuery.faqs$, {initialValue:[]});
  settingsQuery = inject(SettingsQuery);

  ngOnInit(): void {
    this.websiteStoreService.getFaqs();
    this.title.setTitle(this.settingsQuery.seoSettings?.homeTitle??'')
    this.meta.updateTag({ name: 'description', content: this.settingsQuery.seoSettings?.homeDescription??'' });
  }
}
