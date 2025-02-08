import { ILoginOtp } from './../../../../models/auth.interface';
import { AuthStoreQuery } from './../../../../store/authStore/auth-store.query';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { UpperCasePipe } from '@angular/common';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoginFormService } from '../../../../services/auth/login-form.service';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent, UpperCasePipe, BaseLabelComponentComponent, PasswordModule, ReactiveFormsModule, InputValidationAlertComponentComponent],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponentComponent {
  authStoreService = inject(AuthStoreService);
  AuthStoreQuery = inject(AuthStoreQuery);
  loginFormService = inject(LoginFormService);
  isLoading = toSignal(this.AuthStoreQuery.selectLoading())

  login(){
    this.loginFormService.form.valid && this.authStoreService.sendLoginOtp(this.loginFormService.form.value as ILoginOtp);
  }
}
