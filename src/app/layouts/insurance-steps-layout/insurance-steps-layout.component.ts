import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationsContext } from '../../core/animations/animations.class';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from '../../core/animations/animations.animation';
import { BaseLinkComponentComponent } from '../../components/base-components/base-link-component/base-link-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { ERoutes } from '../../core/enums/routes.enum';

@Component({
  selector: 'app-insurance-steps-layout',
  standalone: true,
  imports: [RouterOutlet, BaseLinkComponentComponent, TranslateModule],
  templateUrl: './insurance-steps-layout.component.html',
  styleUrl: './insurance-steps-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimations],
})
export class InsuranceStepsLayoutComponent extends AnimationsContext {
  get ERoutes() { return ERoutes }
  protected steps = [
    {
      text: 'views.insuranceShow.enterData',
      link: ERoutes.additionalData,
    },
    {
      text: 'views.insuranceShow.compareOffers',
      link: ERoutes.compareOffers,
    },
    {
      text: 'views.insuranceShow.insureNow',
      link: ERoutes.orderSummary,
    },
  ]
}
