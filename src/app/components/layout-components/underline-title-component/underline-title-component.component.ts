import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-underline-title-component',
  standalone: true,
  imports: [],
  templateUrl: './underline-title-component.component.html',
  styleUrl: './underline-title-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnderlineTitleComponentComponent {
  @Input() class!: string;
}
