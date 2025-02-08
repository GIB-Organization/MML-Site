import { ChangeDetectionStrategy, Component, WritableSignal, inject, model, signal } from '@angular/core';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgComponentOutlet, UpperCasePipe } from '@angular/common';
import { DialogComponentComponent } from '../../../shared-components/dialog-component/dialog-component.component';
import { EFormType } from '../../../../core/enums/auth.enum';
import { IAuthDialog } from '../../../../models/layout-models/auth.interface';
import { AuthDialogFactory } from '../../../../core/classes/AuthDialog';
import { AuthDialogService } from '../../../../services/auth/auth-dialog.service';


@Component({
  selector: 'app-auth-dialog-component',
  standalone: true,
  imports: [DialogComponentComponent, BaseImageComponentComponent, BaseButtonComponentComponent, TranslateModule, UpperCasePipe, NgComponentOutlet ],
  templateUrl: './auth-dialog-component.component.html',
  styleUrl: './auth-dialog-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDialogComponentComponent {
  public authDialogService = inject(AuthDialogService);

  get EFormType(){
    return EFormType
  }

  visible = model<boolean>(this.authDialogService.visible());
}
