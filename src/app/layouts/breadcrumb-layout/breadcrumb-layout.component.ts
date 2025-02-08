import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponentComponent } from '../../components/layout-components/navbar-component/navbar-component.component';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { FooterContactComponentComponent } from '../../components/layout-components/footer-contact-component/footer-contact-component.component';
import { FooterComponentComponent } from '../../components/layout-components/footer-component/footer-component.component';
import { BreadcrumbComponentComponent } from '../../components/layout-components/breadcrumb-component/breadcrumb-component.component';
import { slideInOutAnimation, routeAnimations } from '../../core/animations/animations.animation';
import { AnimationsContext } from '../../core/animations/animations.class';

@Component({
  selector: 'app-breadcrumb-layout',
  standalone: true,
  imports: [
    NavbarComponentComponent,
    RouterOutlet,
    FooterContactComponentComponent,
    FooterComponentComponent,
    BreadcrumbComponentComponent,
  ],
  templateUrl: './breadcrumb-layout.component.html',
  styleUrl: './breadcrumb-layout.component.scss',
  animations:[
    routeAnimations
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbLayoutComponent extends AnimationsContext {
  
}
