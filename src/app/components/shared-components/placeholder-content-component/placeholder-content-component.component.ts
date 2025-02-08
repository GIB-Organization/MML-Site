import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-placeholder-content-component',
  standalone: true,
  imports: [],
  templateUrl: './placeholder-content-component.component.html',
  styleUrl: './placeholder-content-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderContentComponentComponent {

}
