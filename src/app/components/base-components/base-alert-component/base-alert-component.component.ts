import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-base-alert-component',
  standalone: true,
  imports: [NgbAlert],
  templateUrl: './base-alert-component.component.html',
  styleUrl: './base-alert-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseAlertComponentComponent {
  @Input() type!: 'primary' | 'secondary' | 'danger' | 'light' | 'dark' | 'success' | 'info' | 'warning';
  @Input() animation:boolean = false;
  @Input() dismissible:boolean = false;
  @Input() icon!:string;
}
