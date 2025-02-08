import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-shadow-box-component',
  standalone: true,
  imports: [],
  templateUrl: './shadow-box-component.component.html',
  styleUrl: './shadow-box-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShadowBoxComponentComponent {
  @Input() classes!:string;
}
