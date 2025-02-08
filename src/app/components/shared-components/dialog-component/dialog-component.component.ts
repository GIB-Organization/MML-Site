import { Component, model } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { BaseButtonComponentComponent } from '../../base-components/base-button-component/base-button-component.component';

@Component({
  selector: 'app-dialog-component',
  standalone: true,
  imports: [DialogModule, BaseButtonComponentComponent],
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.scss'
})
export class DialogComponentComponent {
  visible = model<boolean>(false)
}
