import { inject, Injectable } from '@angular/core';
import { EOtpType } from '../../core/enums';
import { AuthStoreService } from '../../store/authStore/auth-store.service';
import { ILoginDTO, ILoginOtp, IRegisterDTO, IRegisterOtp } from '../../models/auth.interface';
import { RegisterFormService } from './register-form.service';
import { LoginFormService } from './login-form.service';

export interface IOtpStrategy {
  form: any,
  type: EOtpType,
  sendOtp(otp:number|null): void;
  /** Asks the server for a fresh code (the previous one stops working). */
  resend(): void;
  authStoreService: AuthStoreService,
}

@Injectable({
  providedIn: 'root'
})
export class OtpStartegy {
  strategy!: IOtpStrategy;
  registerOtp = inject(RegisterOtp);
  loginOtp = inject(LoginOtp);
  setStartegy(type: EOtpType) {
    if (type === EOtpType.register) {
      this.strategy = this.registerOtp;
    }
    else if (type === EOtpType.login) {
      this.strategy = this.loginOtp
    }
    else {
      this.strategy = this.registerOtp
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RegisterOtp implements IOtpStrategy {
  form!: IRegisterDTO;
  type: EOtpType = EOtpType.register;
  authStoreService = inject(AuthStoreService);
  formService = inject(RegisterFormService);
  resend() {
    const value = this.formService.form.value;
    this.authStoreService.sendRegisterOtp({ nationalId: `${value.nationalId}`, phoneNumber: `${value.phoneNumber}` } as IRegisterOtp);
  }
  sendOtp(otp:number | null) {
    this.authStoreService.register({
      ...this.formService.form.value, 
      nationalId: `${this.formService.form.value.nationalId}`,
      phoneNumber: `${this.formService.form.value.phoneNumber}`,
      otpCode:otp

    } as IRegisterDTO)
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginOtp implements IOtpStrategy {
  form!: ILoginDTO;
  type: EOtpType = EOtpType.login;
  authStoreService = inject(AuthStoreService);
  formService = inject(LoginFormService);
  resend() {
    const value = this.formService.form.value;
    this.authStoreService.sendLoginOtp({ email: value.email, password: value.password } as ILoginOtp);
  }
  sendOtp(otp:number | null) {
    this.authStoreService.login({
      ...this.formService.form.value,
      otpCode: otp
    } as ILoginDTO)
  }
}
