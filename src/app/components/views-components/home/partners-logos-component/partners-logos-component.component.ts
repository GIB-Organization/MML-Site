import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';

@Component({
  selector: 'app-partners-logos-component',
  standalone: true,
  imports: [TranslateModule, BaseImageComponentComponent],
  templateUrl: './partners-logos-component.component.html',
  styleUrl: './partners-logos-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersLogosComponentComponent {
  logos:string[]=[
    'logo-01.png',
    'logo-02.png',
    'logo-03.png',
    'logo-04.png',
    'logo-05.png',
    'logo-06.png',
  ]
}
