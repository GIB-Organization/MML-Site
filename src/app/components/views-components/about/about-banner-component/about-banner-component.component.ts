import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-banner-component',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-banner-component.component.html',
  styleUrl: './about-banner-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutBannerComponentComponent {

}
