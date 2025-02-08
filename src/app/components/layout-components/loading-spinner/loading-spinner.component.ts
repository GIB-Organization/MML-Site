import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseImageComponentComponent } from '../../base-components/base-image-component/base-image-component.component';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [BaseImageComponentComponent],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent{
  
}
