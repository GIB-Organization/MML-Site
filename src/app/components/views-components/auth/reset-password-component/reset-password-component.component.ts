import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IResetPassword, IResetPasswordFormGroup } from '../../../../models/auth.interface';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { VALIDATORS } from '../../../../core/validations';

@Component({
  selector: 'app-reset-password-component',
  standalone: true,
  imports: [BaseButtonComponentComponent, TranslateModule, UpperCasePipe, BaseLabelComponentComponent, InputOtpModule, InputValidationAlertComponentComponent, ReactiveFormsModule, PasswordModule],
  templateUrl: './reset-password-component.component.html',
  styleUrl: './reset-password-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponentComponent {
  fb = inject(FormBuilder);
  authStoreService = inject(AuthStoreService);
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading())

  form = this.fb.nonNullable.group<IResetPasswordFormGroup>({
    otp: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    newPassword: this.fb.nonNullable.control('', [VALIDATORS['password'], Validators.required]),
    confirmPassword: this.fb.nonNullable.control('', [VALIDATORS['password'], Validators.required]),
  })

  get otp(){
    return this.form.controls.otp
  }
  get newPassword(){
    return this.form.controls.newPassword
  }
  get confirmPassword(){
    return this.form.controls.confirmPassword
  }

  submit(){
    this.form.valid && this.authStoreService.resetPassword(this.form.value as IResetPassword)
  }
}
