import { TranslateModule } from '@ngx-translate/core';
import { UnderlineTitleComponentComponent } from './../../../layout-components/underline-title-component/underline-title-component.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-company-component',
  standalone: true,
  imports: [UnderlineTitleComponentComponent, TranslateModule],
  templateUrl: './about-company-component.component.html',
  styleUrl: './about-company-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCompanyComponentComponent {

}
