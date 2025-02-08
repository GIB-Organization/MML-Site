import { UnderlineTitleComponentComponent } from './../../components/layout-components/underline-title-component/underline-title-component.component';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsQuery } from '../../store/settings/settings.query';

@Component({
  selector: 'app-privacy-policy-view',
  standalone: true,
  imports: [TranslateModule, UnderlineTitleComponentComponent],
  templateUrl: './privacy-policy-view.component.html',
  styleUrl: './privacy-policy-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyViewComponent implements OnInit{
  title = inject(Title);
  settingsQuery = inject(SettingsQuery);
  translateService = inject(TranslateService);
  meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle(this.settingsQuery.seoSettings?.privacyPolicyTitle??'')
    this.meta.updateTag({ name: 'description', content: this.settingsQuery.seoSettings?.privacyPolicyDescription??'' });
  }
}
