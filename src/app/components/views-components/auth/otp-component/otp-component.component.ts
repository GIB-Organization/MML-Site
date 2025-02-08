import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputOtpModule } from 'primeng/inputotp';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OtpFormService } from '../../../../services/auth/otp-form.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-otp-component',
  standalone: true,
  imports: [InputOtpModule, TranslateModule, UpperCasePipe, BaseLabelComponentComponent, BaseButtonComponentComponent, ReactiveFormsModule],
  templateUrl: './otp-component.component.html',
  styleUrl: './otp-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpComponentComponent {
  public otp = new FormControl(null, [Validators.required, Validators.minLength(4)]);
  otpFormService = inject(OtpFormService)
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading());
}
