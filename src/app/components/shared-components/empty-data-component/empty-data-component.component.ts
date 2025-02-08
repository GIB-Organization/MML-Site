import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseImageComponentComponent } from '../../base-components/base-image-component/base-image-component.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-data-component',
  standalone: true,
  imports: [BaseImageComponentComponent, TranslateModule],
  templateUrl: './empty-data-component.component.html',
  styleUrl: './empty-data-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyDataComponentComponent {
  @Input() empty: boolean = false;
  @Input() message: string = 'public.emptyData'
}
