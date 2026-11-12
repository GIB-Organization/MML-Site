import { Injectable, inject, signal } from '@angular/core';
import { AuthApiService } from '../../services/api/authApi/auth-api.service';
import { AuthStore } from './auth-store.store';
import { IChangeInfo, IChangePassword, IForgotPassword, ILoginDTO, ILoginOtp, IOtpSendResponse, IRefreshTokenDTO, IRegisterDTO, IRegisterOtp, IResetPassword } from '../../models/auth.interface';
import { EMPTY, distinctUntilChanged, firstValueFrom, switchMap, take, timer } from 'rxjs';
import { msUntilRenewal } from '../../core/utils/jwt';
import { TokenRefreshService } from '../../services/auth/token-refresh.service';
import { SessionLifecycleService } from '../../services/core/session/session-lifecycle.service';
import { AuthDialogService } from '../../services/auth/auth-dialog.service';
import { EFormType, EOtpType, ERoutes } from '../../core/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { IRoutingData } from '../../models/routing.interface';
import { EQueryParams } from '../../core/enums/routes.enum';
import { IErrorResponse } from '../../models/response.interface';
import { AuthStoreQuery } from './auth-store.query';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private api = inject(AuthApiService);
  private store = inject(AuthStore);
  private authDialogService = inject(AuthDialogService);
  private authService = inject(AuthService);
  private authStoreQuery = inject(AuthStoreQuery);
  private session = inject(SessionLifecycleService);
  private refresher = inject(TokenRefreshService);
  private toasterService = inject(ToasterService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // challenge the recovery code was issued for; kept in memory only. The server never returns the code (VULN-002, VULN-010).
  #challengeId = "";
  /** Epoch ms from which another code may be requested (from the server's resendAfterSeconds, VULN-012). */
  otpResendAt = signal(0);

  #restoring: Promise<boolean> | null = null;

  constructor() {
    // renew the access token a minute before it ends, so the screen does not flip to signed out in the middle of a visit (VULN-071).
    // A new token restarts the timer; signing out empties the store, which cancels it. A failed renewal is left to the next request's 401 handling.
    this.authStoreQuery.select(state => state.authData?.token?.accessToken).pipe(
      distinctUntilChanged(),
      switchMap(token => {
        const wait = msUntilRenewal(token);
        return wait === null ? EMPTY : timer(wait);
      })
    ).subscribe(() => this.refresher.refresh().pipe(take(1)).subscribe({ error: () => {} }));
  }

  #markSent(sent?: IOtpSendResponse) {
    this.otpResendAt.set(Date.now() + (sent?.resendAfterSeconds ?? 60) * 1000);
  }

  /** Loads the customer's own details (contact, national id, bank) now that the token no longer has to carry them (VULN-042). A failure only leaves the forms as they are. */
  loadProfile() {
    if (!this.authStoreQuery.isAuthenticated) return;
    this.api.getProfile().pipe(take(1)).subscribe({
      next: (res) => { if (res?.result) this.authStoreQuery.setProfile(res.result); },
      error: () => {}
    });
  }

  /**
   * Called once before the first page (APP_INITIALIZER): a reload keeps the customer signed in by trading the refresh token kept in
   * session storage for an access token, which then lives in memory only. Earlier releases' local-storage copies are removed first (VULN-064).
   * Resolves true when a session is active. Never rejects.
   */
  restoreSession(): Promise<boolean> {
    this.authService.purgeLegacy();
    if (this.authStoreQuery.isAuthenticated) return Promise.resolve(true);

    const refresh = this.authService.getRefresh();
    if (!refresh) return Promise.resolve(false);

    this.#restoring ??= firstValueFrom(this.api.refreshToken({ accessToken: '', refreshToken: refresh }))
      .then((res) => {
        this.authStoreQuery.setUser = { token: res.result };
        this.loadProfile();
        return true;
      })
      .catch((err) => {
        // an expired, revoked or reused token is finished; a network or server hiccup is not, the next reload tries again
        if (err?.status === 401 || err?.status === 400) this.authService.logout();
        return false;
      })
      .finally(() => { this.#restoring = null; });
    return this.#restoring;
  }
  logout(){
    // end the server-side session first (best effort: signing out locally must never wait for or fail because of it) (VULN-017)
    const refresh = this.authStoreQuery.token?.refreshToken;
    if (refresh) this.api.logout(refresh).pipe(take(1)).subscribe({ error: () => {} });
    // every private store is emptied and requests still in flight are dropped (VULN-067)
    this.session.endSession();
    this.authService.logout();
    this.authDialogService.otpDialogType = EOtpType.login;
    this.authDialogService.openComponent(EFormType.login);
    this.logoutRedirect();
  }
  /**
   * @param  {ActivatedRoute=this.activatedRoute} route
   * @returns any
   */
  logoutRedirect(route:ActivatedRoute = this.activatedRoute):any{
    const children: ActivatedRoute[] = route.children;
    for (const child of children) {
      if(!child.children.length){
        const parent = child.parent?.snapshot;
        if((parent?.data as IRoutingData).withLogoutRedirect || (child.snapshot.data as IRoutingData).withLogoutRedirect){
          this.router.navigate(['/']);
        }
        return
      }
      return this.logoutRedirect(child);
    }
  }
  /**
   * @param  {ILoginDTO} data
   */
  login(data: ILoginDTO) {
    this.store.setLoading(true)
    this.api.login(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.authDialogService.clearCredentials()
        this.authDialogService.visible.set(false)
        this.toasterService.addSuccess()
        this.authStoreQuery.setUser = res.result
        this.loadProfile()
        this.afterLoginRedirect()
        this.authDialogService.otpDialogType = EOtpType.login;
        this.authDialogService.openComponent(EFormType.login);
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setError(err.error)
        this.toasterService.addError(err.status === 429 ? 'errors.tooManyRequests' : err.error)
        this.store.setLoading(false)
        // the typed password does not stay behind after a failed attempt (VULN-073)
        this.authDialogService.discardAttempt(EFormType.login)
      }
    });
  }
  /**
   * @param  {IRegisterDTO} data
   */
  register(data: IRegisterDTO) {
    this.store.setLoading(true)
    this.api.register(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.authStoreQuery.setUser = res.result
        this.loadProfile()
        this.toasterService.addSuccess()
        this.authDialogService.clearCredentials()
        this.authDialogService.visible.set(false)
        this.router.navigate([`/${ERoutes.profile}`]);
        this.authDialogService.otpDialogType = EOtpType.login;
        this.authDialogService.openComponent(EFormType.login);
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setError(err.error)
        this.toasterService.addError(err.status === 429 ? 'errors.tooManyRequests' : err.error)
        this.store.setLoading(false)
        this.authDialogService.discardAttempt(EFormType.register)
      }
    });
  }
  /**
   * @param  {IRegisterOtp} data
   */
  sendRegisterOtp(data: IRegisterOtp) {
    this.store.setLoading(true)
    this.api.sendRegisterOtp(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.authDialogService.otpDialogType = EOtpType.register;
        this.authDialogService.openComponent(EFormType.otp);
        this.#markSent(res.result);
      },
      error: (err) => {
        this.store.setLoading(false)
      if (err.status === 300) {
        this.toasterService.addError('errors.mobilevertification');
      } else if (err.status === 429) {
        this.toasterService.addError('errors.tooManyRequests');
      } else if (err.status === 503) {
        this.toasterService.addError('errors.otpDeliveryFailed');
      } else {
        this.toasterService.addError(err.error);
      }
        this.store.setError(err.error)
        this.authDialogService.discardAttempt(EFormType.register)
      },
      complete: () => this.store.setLoading(false),

    });
  }
  /**
   * @param  {ILoginOtp} data
   */
  sendLoginOtp(data: ILoginOtp) {
    this.store.setLoading(true)
    this.api.sendLoginOtp(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.authDialogService.otpDialogType = EOtpType.login;
        this.authDialogService.openComponent(EFormType.otp);
        this.#markSent(res.result);
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError(err.status === 429 ? 'errors.tooManyRequests' : err.status === 503 ? 'errors.otpDeliveryFailed' : 'customRequestErrors.invalidUserOrPassword')
        this.store.setLoading(false)
        this.authDialogService.discardAttempt(EFormType.login)
      }
    });
  }
  /**
   * @param  {IRefreshTokenDTO} data
   */
  refreshToken(data?: IRefreshTokenDTO) {
    this.refresher.refresh().pipe(take(1)).subscribe({ error: () => {} });
  }
  /**
   * @param  {IChangeInfo} data
   */
  changeInfo(data: IChangeInfo) {
    this.store.setLoading(true)
    this.api.changeInfo(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.toasterService.addSuccess()
        this.authStoreQuery.setUser = res.result;
        this.loadProfile();
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError(err?.error?.message ?? 'customRequestErrors.invalidEmailOrMobile')
        this.store.setError(err)
        this.store.setLoading(false)
      }
    });
  }
  /**
   * @param  {IChangePassword} data
   */
  changePassword(data: IChangePassword) {
    this.store.setLoading(true)
    this.api.changePassword(data).pipe(take(1)).subscribe({
      next: (res) => {
        // a password change ends every session; the server returns the pair that keeps this one signed in (VULN-016)
        if (res.result?.token) this.authStoreQuery.setUser = res.result;
        this.toasterService.addSuccess()
      },
      complete: () => this.store.setLoading(false),
      error: (err:IErrorResponse) => {
        this.store.setError(err)
        this.store.setLoading(false)
        this.toasterService.addError(err.error.message ?? 'customRequestErrors.wrongPassword')
      }
    });
  }

  afterLoginRedirect(){
    const redirect = this.activatedRoute.snapshot.queryParams[EQueryParams.redirectTo]
    redirect && this.router.navigate([redirect]);
  }

  forgotPassword(data: IForgotPassword) {
    this.store.setLoading(true)
    this.api.forgotPassword(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.#challengeId = res.result?.challengeId ?? "";
        this.authDialogService.openComponent(EFormType.resetPassword);
        this.#markSent(res.result);
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError(err.status === 429 ? 'errors.tooManyRequests' : err.status === 503 ? 'errors.otpDeliveryFailed' : 'customRequestErrors.invalidUserOrPassword')
        this.store.setLoading(false)
      }
    });
  }

  resetPassword(data: IResetPassword) {
    this.store.setLoading(true)
    this.api.resetPassword({ ...data, challengeId: this.#challengeId }).pipe(take(1)).subscribe({
      next: () => {
        this.authDialogService.openComponent(EFormType.login);
        this.toasterService.addSuccess('views.auth.passwordChanged')
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError(err.status === 429 ? 'errors.tooManyRequests' : 'customRequestErrors.invalidEmailOrId')
        this.store.setLoading(false)
      }
    });
  }
}
