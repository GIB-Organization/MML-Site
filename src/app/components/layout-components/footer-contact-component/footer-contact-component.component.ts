import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLinkComponentComponent } from '../../base-components/base-link-component/base-link-component.component';
import { SettingsQuery } from '../../../store/settings/settings.query';

@Component({
  selector: 'app-footer-contact-component',
  standalone: true,
  imports: [TranslateModule, BaseLinkComponentComponent],
  templateUrl: './footer-contact-component.component.html',
  styleUrl: './footer-contact-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterContactComponentComponent {
  constructor(public settingsQuery: SettingsQuery){} 
}
