import { UnderlineTitleComponentComponent } from './../../../layout-components/underline-title-component/underline-title-component.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';
import { CardComponentComponent } from '../../../layout-components/card-component/card-component.component';
import { ICard } from '../../../../models/layout-models/card.interface';

@Component({
  selector: 'app-apply-steps-component',
  standalone: true,
  imports: [TranslateModule, BaseImageComponentComponent, CardComponentComponent, UnderlineTitleComponentComponent],
  templateUrl: './apply-steps-component.component.html',
  styleUrl: './apply-steps-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyStepsComponentComponent {
  steps:ICard[]=[
    {
      img: 'success.png',
      title: 'views.home.applySteps.selectInsuranceTitle',
      description: 'views.home.applySteps.selectInsuranceDesc'
    },
    {
      img: 'choose.png',
      title: 'views.home.applySteps.compareOffersTitle',
      description: 'views.home.applySteps.compareOffersDesc'
    },
    {
      img: 'payment.png',
      title: 'views.home.applySteps.makePaymentTitle',
      description: 'views.home.applySteps.makePaymentDesc'
    },
  ]
}
