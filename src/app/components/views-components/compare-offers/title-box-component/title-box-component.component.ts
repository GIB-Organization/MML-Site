import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BaseLinkComponentComponent } from '../../../base-components/base-link-component/base-link-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { getRemainingTimeUntilMidnight } from '../../../../core/utils/remainTime';

@Component({
  selector: 'app-title-box-component',
  standalone: true,
  imports: [BaseLinkComponentComponent, TranslateModule, UpperCasePipe],
  templateUrl: './title-box-component.component.html',
  styleUrl: './title-box-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBoxComponentComponent {
  step = input<string>('');
  title = input<string>('');
  subtitle = input<string>('');
  remainingTime = getRemainingTimeUntilMidnight();
}
