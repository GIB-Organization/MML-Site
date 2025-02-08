import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaceholderContentComponentComponent } from '../placeholder-content-component/placeholder-content-component.component';

@Component({
  selector: 'app-defer-block-component',
  standalone: true,
  imports: [PlaceholderContentComponentComponent],
  templateUrl: './defer-block-component.component.html',
  styleUrl: './defer-block-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeferBlockComponentComponent {

}
