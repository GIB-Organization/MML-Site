import { ICard } from '../../../../models/layout-models/card.interface';
import { CardComponentComponent } from './../../../layout-components/card-component/card-component.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vision-message-component',
  standalone: true,
  imports: [CardComponentComponent],
  templateUrl: './vision-message-component.component.html',
  styleUrl: './vision-message-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisionMessageComponentComponent {
  data: ICard[] = [
    {
      img: 'ico/vision-icon.svg',
      title: 'views.about.vision',
      description: 'views.about.visionDesc'
    },
    {
      img: 'ico/message-icon.svg',
      title: 'views.about.message',
      description: 'views.about.messageDesc'
    },
  ]
}
