import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponentComponent } from '../../components/layout-components/navbar-component/navbar-component.component';
import { RouterOutlet } from '@angular/router';
import { FooterContactComponentComponent } from '../../components/layout-components/footer-contact-component/footer-contact-component.component';
import { FooterComponentComponent } from '../../components/layout-components/footer-component/footer-component.component';
import { slideInOutAnimation } from '../../core/animations/animations.animation';
import { AnimationsContext } from '../../core/animations/animations.class';
import { DeferBlockComponentComponent } from "../../components/shared-components/defer-block-component/defer-block-component.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NavbarComponentComponent,
    RouterOutlet,
    FooterContactComponentComponent,
    FooterComponentComponent,
    DeferBlockComponentComponent
],
  animations:[slideInOutAnimation],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent extends AnimationsContext{
  
}
