import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SafeHtmlPipe } from '../../core/pipes/safeHtml/safe-html.pipe';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsQuery } from '../../store/settings/settings.query';
import { SettingsStoreService } from '../../store/settings/settings-store.service';

@Component({
  selector: 'app-privacy-policy-view',
  standalone: true,
  imports: [SafeHtmlPipe, TranslateModule],
  templateUrl: './privacy-policy-view.component.html',
  styleUrl: './privacy-policy-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyViewComponent implements OnInit{
  title = inject(Title);
  settingsQuery = inject(SettingsQuery);
  settingsStoreService = inject(SettingsStoreService);
  meta = inject(Meta);
  settings = toSignal(this.settingsQuery.privacyPolicySettings$);

  ngOnInit(): void {
    this.title.setTitle(this.settingsQuery.seoSettings?.privacyPolicyTitle??'')
    this.meta.updateTag({ name: 'description', content: this.settingsQuery.seoSettings?.privacyPolicyDescription??'' });
    this.settingsStoreService.getPrivacyPolicySettings();
  }
}
