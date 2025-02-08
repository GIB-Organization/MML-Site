import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UnderlineTitleComponentComponent } from '../../components/layout-components/underline-title-component/underline-title-component.component';
import { Meta, Title } from '@angular/platform-browser';
import { SettingsQuery } from '../../store/settings/settings.query';

@Component({
  selector: 'app-terms-conditions-view',
  standalone: true,
  imports: [TranslateModule, UnderlineTitleComponentComponent],
  templateUrl: './terms-conditions-view.component.html',
  styleUrl: './terms-conditions-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsConditionsViewComponent {
  title = inject(Title);
  settingsQuery = inject(SettingsQuery);
  translateService = inject(TranslateService);
  meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle(this.settingsQuery.seoSettings?.termsTitle??'')
    this.meta.updateTag({ name: 'description', content: this.settingsQuery.seoSettings?.termsDescription??'' });
  }
}
