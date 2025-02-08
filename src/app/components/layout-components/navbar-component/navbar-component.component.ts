import { AuthStoreService } from './../../../store/authStore/auth-store.service';
import { AuthDialogService } from './../../../services/auth/auth-dialog.service';
import { ERoutes } from './../../../core/enums/routes.enum';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { BaseImageComponentComponent } from '../../base-components/base-image-component/base-image-component.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthDialogComponentComponent } from '../../views-components/auth/auth-dialog-component/auth-dialog-component.component';
import { BaseLinkComponentComponent } from '../../base-components/base-link-component/base-link-component.component';
import { ILayoutStrategy, LtrDirection, RtlDirection } from '../../../core/classes/LayoutStyleDir';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { EFormType } from '../../../core/enums';
import { toSignal } from '@angular/core/rxjs-interop';
import { LanguageService } from '../../../services/language/language.service';
@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [BaseImageComponentComponent, TranslateModule, NgbCollapse, RouterLink, RouterLinkActive, AuthDialogComponentComponent, BaseLinkComponentComponent, BaseLinkComponentComponent],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: 'LtrDirection', useClass: LtrDirection }, // Initial behavior
    { provide: 'RtlDirection', useClass: RtlDirection }, // Initial behavior
  ]
})
export class NavbarComponentComponent {
  constructor(
    @Inject('LtrDirection') LtrDirection: ILayoutStrategy,
    @Inject('RtlDirection') RtlDirection: ILayoutStrategy,
  ) {
    this.ltrDirection = LtrDirection;
    this.rtlDirection = RtlDirection;
    this.switchDirection = this.language.getCurrentLang() === 'ar' ? this.rtlDirection:this.ltrDirection;
  }
  isMenuCollapsed: boolean = true;
  ltrDirection!: ILayoutStrategy;
  rtlDirection!: ILayoutStrategy;
  switchDirection!: ILayoutStrategy;
  language = inject(LanguageService)
  authDialogService = inject(AuthDialogService)
  authStoreQuery = inject(AuthStoreQuery)
  authStoreService = inject(AuthStoreService)
  isAuthenticated = toSignal(this.authStoreQuery.isAuthenticated$);
  navLinks: { lang: string, link: string }[] = [
    {
      lang: 'whoWeAre',
      link: ERoutes.about
    },
    {
      lang: 'bolg',
      link: ERoutes.blog
    },
    {
      lang: 'contactUs',
      link: ERoutes.contact
    },
  ]

  get ERoutes(){
    return ERoutes
  }

  switchLang() {
    this.switchDirection = this.switchDirection === this.ltrDirection ? this.rtlDirection : this.ltrDirection;
    this.switchDirection.switchDirection();
  }
}
