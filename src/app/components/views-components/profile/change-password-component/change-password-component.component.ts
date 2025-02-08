import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShadowBoxComponentComponent } from '../shadow-box-component/shadow-box-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IChangePassword, IChangePasswordFormGroup } from '../../../../models/auth.interface';
import { VALIDATORS } from '../../../../core/validations';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-change-password-component',
  standalone: true,
  imports: [ShadowBoxComponentComponent, BaseButtonComponentComponent, TranslateModule, BaseLabelComponentComponent, InputValidationAlertComponentComponent, ReactiveFormsModule, PasswordModule],
  templateUrl: './change-password-component.component.html',
  styleUrl: './change-password-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponentComponent {
  authStoreService = inject(AuthStoreService);
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading());
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group<IChangePasswordFormGroup>({
    oldPassword: this.fb.control(null, [Validators.required]),
    newPassword: this.fb.control(null, [VALIDATORS['password']]),
    confirmPassword:this.fb.control(null, [Validators.required] )
  })
  get oldPassword(){
    return this.form.controls.oldPassword;
  }
  get newPassword(){
    return this.form.controls.newPassword;
  }
  get confirmPassword(){
    return this.form.controls.confirmPassword;
  }

  get formIsValid(){
    return this.form.valid && this.newPassword.value === this.confirmPassword.value
  }

  submit(){
    this.formIsValid && this.authStoreService.changePassword(this.form.value as IChangePassword)
  }
}
