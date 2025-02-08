import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';
import { UnderlineTitleComponentComponent } from '../../../layout-components/underline-title-component/underline-title-component.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-company-goals-component',
  standalone: true,
  imports: [BaseImageComponentComponent, UnderlineTitleComponentComponent, TranslateModule],
  templateUrl: './company-goals-component.component.html',
  styleUrl: './company-goals-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyGoalsComponentComponent {

}
