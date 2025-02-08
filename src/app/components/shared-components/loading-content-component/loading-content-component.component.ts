import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { PlaceholderContentComponentComponent } from '../placeholder-content-component/placeholder-content-component.component';

@Component({
  selector: 'app-loading-content-component',
  standalone: true,
  imports: [PlaceholderContentComponentComponent],
  templateUrl: './loading-content-component.component.html',
  styleUrl: './loading-content-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingContentComponentComponent {
  loading = input<boolean>();
}
