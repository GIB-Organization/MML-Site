import { BaseImageComponentComponent } from './../../../base-components/base-image-component/base-image-component.component';
import { ERoutes } from './../../../../core/enums/routes.enum';
import { BaseLinkComponentComponent } from './../../../base-components/base-link-component/base-link-component.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { ShadowBoxComponentComponent } from '../shadow-box-component/shadow-box-component.component';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-sidebar-component',
  standalone: true,
  imports: [BaseLinkComponentComponent, BaseImageComponentComponent, TranslateModule, BaseButtonComponentComponent, ShadowBoxComponentComponent],
  templateUrl: './profile-sidebar-component.component.html',
  styleUrl: './profile-sidebar-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSidebarComponentComponent {
  private localePath = 'views.profile.';
  public authStoreService = inject(AuthStoreService);
  public router = inject(Router);
  sidedLinks: {icon:string, path: ERoutes, text: string}[] = [
    {
      path: ERoutes.quotations,
      text: `${this.localePath}quotations.title`,
      icon: 'svg/cards.svg'
    },
    {
      path: ERoutes.cars,
      text: `${this.localePath}cars.title`,
      icon: 'svg/cars.svg'
    },
    {
      path: ERoutes.invoices,
      text: `${this.localePath}invoices.title`,
      icon: 'svg/invoice.svg'
    },
    {
      path: ERoutes.supportTicket,
      text: `${this.localePath}supportTicket.title`,
      icon: 'svg/support-ticket.svg'
    },
    {
      path: ERoutes.personalInfo,
      text: `${this.localePath}personalInfo.title`,
      icon: 'svg/personal-info.svg'
    } 
  ] 

  logout(){
    this.authStoreService.logout();
    this.router.navigate(['/']);
  }
}
