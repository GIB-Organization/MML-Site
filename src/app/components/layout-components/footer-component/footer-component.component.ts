import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseImageComponentComponent } from '../../base-components/base-image-component/base-image-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLinkComponentComponent } from '../../base-components/base-link-component/base-link-component.component';
import { SidedIconComponentComponent } from '../../shared-components/sided-icon-component/sided-icon-component.component';
import { SettingsQuery } from '../../../store/settings/settings.query';
import { ERoutes } from '../../../core/enums/routes.enum';
import { DeferBlockComponentComponent } from "../../shared-components/defer-block-component/defer-block-component.component";

@Component({
  selector: 'app-footer-component',
  standalone: true,
  imports: [
    BaseImageComponentComponent,
    TranslateModule,
    BaseLinkComponentComponent,
    SidedIconComponentComponent,
    TranslateModule,
    DeferBlockComponentComponent
],
  templateUrl: './footer-component.component.html',
  styleUrl: './footer-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponentComponent {
  settingsQuery = inject(SettingsQuery);
  get ERoutes(){
    return ERoutes
  }
  
  socialMedia: {icon:string, path:string}[]=[
    {
      icon: 'facebook',
      path: this.settingsQuery.generalSettings?.facebook??''
    },
    {
      icon: 'instagram',
      path: this.settingsQuery.generalSettings?.instagram??''
    },
    {
      icon: 'twitter',
      path: this.settingsQuery.generalSettings?.x??''
    },
    {
      icon: 'youtube',
      path: this.settingsQuery.generalSettings?.youtube??''
    },
  ]

  getCurrentYear(){
    return new Date().getFullYear();
  }
}
