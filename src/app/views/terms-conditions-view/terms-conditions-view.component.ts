import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SafeHtmlPipe } from '../../core/pipes/safeHtml/safe-html.pipe';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsQuery } from '../../store/settings/settings.query';
import { SettingsStoreService } from '../../store/settings/settings-store.service';

@Component({
  selector: 'app-terms-conditions-view',
  standalone: true,
  imports: [SafeHtmlPipe, TranslateModule],
  templateUrl: './terms-conditions-view.component.html',
  styleUrl: './terms-conditions-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsConditionsViewComponent implements OnInit{
  title = inject(Title);
  settingsQuery = inject(SettingsQuery);
  settingsStoreService = inject(SettingsStoreService);
  meta = inject(Meta);
  settings = toSignal(this.settingsQuery.termsSettings$);

  ngOnInit(): void {
    this.title.setTitle(this.settingsQuery.seoSettings?.termsTitle??'')
    this.meta.updateTag({ name: 'description', content: this.settingsQuery.seoSettings?.termsDescription??'' });
    this.settingsStoreService.getTermsSettings();
  }
}
