import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForgotPassword, IForgotPasswordFormGroup } from '../../../../models/auth.interface';
import { INSURNACE_INQUIRE_VALIDATORS, VALIDATORS } from '../../../../core/validations';
import { DividerModule } from 'primeng/divider';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-forgot-password-component',
  standalone: true,
  imports: [BaseButtonComponentComponent, TranslateModule, UpperCasePipe, BaseLabelComponentComponent, DividerModule, InputValidationAlertComponentComponent, ReactiveFormsModule, InputNumberModule],
  templateUrl: './forgot-password-component.component.html',
  styleUrl: './forgot-password-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponentComponent {
  fb = inject(FormBuilder);
  authStoreService = inject(AuthStoreService);
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading())

  form = this.fb.group<IForgotPasswordFormGroup>({
    email: this.fb.nonNullable.control('', [VALIDATORS['email'], Validators.required]),
    nationalId: this.fb.control(null, [...INSURNACE_INQUIRE_VALIDATORS['idNumber']]),
  })

  get email(){
    return this.form.controls.email
  }
  get nationalId(){
    return this.form.controls.nationalId
  }


  submit(){
    (this.email.valid || this.nationalId.valid) && this.authStoreService.forgotPassword({...this.form.value, nationalId: String(this.form.value.nationalId)} as IForgotPassword);
  }
}
