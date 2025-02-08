import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { UpperCasePipe } from '@angular/common';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { RegisterFormService } from '../../../../services/auth/register-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { IRegisterOtp } from '../../../../models/auth.interface';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent, UpperCasePipe, BaseLabelComponentComponent, ReactiveFormsModule, InputValidationAlertComponentComponent, InputNumberModule, PasswordModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponentComponent {
  registerService = inject(RegisterFormService);
  authStoreQuery = inject(AuthStoreQuery);
  authStoreService = inject(AuthStoreService);
  isLoading = toSignal(this.authStoreQuery.selectLoading())

  register(){
    const {nationalId,phoneNumber} = this.registerService.form.value;
    this.registerService.formIsValid && this.authStoreService.sendRegisterOtp({nationalId:`${nationalId}`,phoneNumber:`${phoneNumber}`} as IRegisterOtp);
  }
}
