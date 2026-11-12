import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputOtpModule } from 'primeng/inputotp';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OtpFormService } from '../../../../services/auth/otp-form.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, startWith } from 'rxjs';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
@Component({
  selector: 'app-otp-component',
  standalone: true,
  imports: [InputOtpModule, TranslateModule, UpperCasePipe, BaseLabelComponentComponent, BaseButtonComponentComponent, ReactiveFormsModule],
  templateUrl: './otp-component.component.html',
  styleUrl: './otp-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpComponentComponent {
  public otp = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  otpFormService = inject(OtpFormService)
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading());
  authStoreService = inject(AuthStoreService);

  // "resend" opens when the server's resend interval has passed (VULN-012)
  private now = toSignal(interval(1000).pipe(map(() => Date.now()), startWith(Date.now())), { initialValue: Date.now() });
  resendIn = computed(() => Math.max(0, Math.ceil((this.authStoreService.otpResendAt() - this.now()) / 1000)));

  resend() {
    if (this.resendIn() === 0 && !this.isLoading()) {
      this.otp.reset();
      this.otpFormService.resend();
    }
  }

  // auto-submit once all 6 digits are entered (typed or pasted)
  onOtpChange() {
    if (this.otp.valid && !this.isLoading()) {
      this.otpFormService.sendOtp(this.otp.value);
    }
  }
}
