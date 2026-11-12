import { effect, inject, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { AuthDialogFactory } from '../../core/classes/AuthDialog';
import { EFormType, EOtpType } from '../../core/enums';
import { IAuthDialog } from '../../models/layout-models/auth.interface';
import { LoginFormService } from './login-form.service';
import { RegisterFormService } from './register-form.service';

/** How long the code step may stay open; the server's code is valid for a few minutes, so the typed password is not kept longer than that (VULN-073). */
export const OTP_STEP_TTL_MS = 3 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  #loginForm = inject(LoginFormService);
  #registerForm = inject(RegisterFormService);
  #otpTimer: ReturnType<typeof setTimeout> | null = null;

  public _AuthDialogFactory = new AuthDialogFactory();
  public otpDialogType: EOtpType = EOtpType.register;
  visibleForm: WritableSignal<IAuthDialog> = signal(this._AuthDialogFactory.createDialogContent(EFormType.login));
  visible = signal(false);

  constructor() {
    // whatever closes the dialog (the X, a click outside, Escape, a successful login) also empties the forms
    effect(() => {
      if (!this.visible()) untracked(() => this.clearCredentials());
    });
  }

  get EFormType(){
    return EFormType
  }

  openComponent(type : EFormType){
    this.#cancelOtpTimer();
    this.visibleForm.set(this._AuthDialogFactory.createDialogContent( type ))
    if (type === EFormType.otp) {
      // an abandoned code step must not keep the password in memory
      this.#otpTimer = setTimeout(() => {
        this.#otpTimer = null;
        this.clearCredentials();
        this.openComponent(EFormType.login);
      }, OTP_STEP_TTL_MS);
    }
  }

  openLoginDialog(){
    this.openComponent(EFormType.login);
    this.visible.set(true);
  }

  /** Empties the sign-in and registration forms and stops the code-step timer. Called on close, success, sign-out and expiry. */
  clearCredentials(){
    this.#cancelOtpTimer();
    this.#loginForm.clear();
    this.#registerForm.clear();
  }

  /** A sign-in or registration attempt failed: the passwords are dropped and the user goes back to the first step. */
  discardAttempt(type: EFormType.login | EFormType.register){
    if (type === EFormType.login) this.#loginForm.clearSecrets(); else this.#registerForm.clearSecrets();
    this.openComponent(type);
  }

  #cancelOtpTimer(){
    if (this.#otpTimer !== null) { clearTimeout(this.#otpTimer); this.#otpTimer = null; }
  }
}
