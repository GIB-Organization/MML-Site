import { Injectable, inject } from '@angular/core';
import { AuthApiService } from '../../services/api/authApi/auth-api.service';
import { AuthStore } from './auth-store.store';
import { IChangeInfo, IChangePassword, IForgotPassword, ILoginDTO, ILoginOtp, IRefreshTokenDTO, IRegisterDTO, IRegisterOtp, IResetPassword } from '../../models/auth.interface';
import { take } from 'rxjs';
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
  private toasterService = inject(ToasterService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  getUserFromLocal() {
    this.store.update({
      authData: this.authService.getUserFromLocal()
    })
  }
  logout(){
    this.store.reset();
    this.authService.logout();
    this.authDialogService.otpDialogType = EOtpType.login;
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
        this.authDialogService.visible.set(false)
        this.toasterService.addSuccess()
        this.authStoreQuery.setUser = res.result
        this.afterLoginRedirect()
        this.authDialogService.otpDialogType = EOtpType.login;
        this.authDialogService.openComponent(EFormType.login);
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setError(err.error)
        this.toasterService.addError(err.error)
        this.store.setLoading(false)
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
        this.toasterService.addSuccess()
        this.authDialogService.visible.set(false)
        this.router.navigate([`/${ERoutes.profile}`]);
        this.authDialogService.otpDialogType = EOtpType.login;
        this.authDialogService.openComponent(EFormType.login);
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setError(err.error)
        this.toasterService.addError(err.error)
        this.store.setLoading(false)
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
        this.store.update({ otp: res.result });
      },
      error: (err) => {
        this.store.setLoading(false)
      if (err.status === 300) {
        this.toasterService.addError('errors.mobilevertification');
      } else {
        this.toasterService.addError(err.error);
      }
        this.store.setError(err.error)
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
        this.store.update({ otp: res.result });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError('customRequestErrors.invalidUserOrPassword')
        this.store.setLoading(false)
      }
    });
  }
  /**
   * @param  {IRefreshTokenDTO} data
   */
  refreshToken(data: IRefreshTokenDTO) {
    this.store.setLoading(true)
    this.api.refreshToken(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.authStoreQuery.setUser = {
          ...this.authStoreQuery.user,
          token:res.result
        }
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setError(err)
        this.store.setLoading(false)
      }
    });
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
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError('customRequestErrors.invalidEmailOrMobile')
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
      next: () => {
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
        this.authDialogService.openComponent(EFormType.resetPassword);
        this.store.update({ otp: res.result });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError('customRequestErrors.invalidUserOrPassword')
        this.store.setLoading(false)
      }
    });
  }

  resetPassword(data: IResetPassword) {
    this.store.setLoading(true)
    this.api.resetPassword(data).pipe(take(1)).subscribe({
      next: () => {
        this.authDialogService.openComponent(EFormType.login);
        this.toasterService.addSuccess('views.auth.passwordChanged')
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError('customRequestErrors.invalidEmailOrId')
        this.store.setLoading(false)
      }
    });
  }
}
