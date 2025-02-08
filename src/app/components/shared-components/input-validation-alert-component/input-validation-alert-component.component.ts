import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseAlertComponentComponent } from '../../base-components/base-alert-component/base-alert-component.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-validation-alert-component',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './input-validation-alert-component.component.html',
  styleUrl: './input-validation-alert-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputValidationAlertComponentComponent extends BaseAlertComponentComponent {

}
