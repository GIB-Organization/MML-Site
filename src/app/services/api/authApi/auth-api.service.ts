import { IResponse } from './../../../models/response.interface';
import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { IContactChangeConfirm, IContactChangeRequest, IProfile, IChangeInfo, IChangePassword, IForgotPassword, ILoginDTO, ILoginOtp, ILoginResponse, IOtpSendResponse, IRefreshTokenDTO, IRegisterDTO, IRegisterOtp, IResetPassword } from '../../../models/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'account'
  public refreshPath = 'refreshToken'
  private http = inject(HttpClient)
  /**
   * @param  {ILoginDTO} data
   * @returns Observable
   */
  login(data:ILoginDTO): Observable<IResponse<ILoginResponse>>{
    return this.http.post<IResponse<ILoginResponse>>(`${this.baseUrl}/${this.path}/login`, data)
  }
  /**
   * @param  {IRegisterDTO} data
   * @returns Observable
   */
  register(data:IRegisterDTO): Observable<IResponse<ILoginResponse>>{
    return this.http.post<IResponse<ILoginResponse>>(`${this.baseUrl}/${this.path}/register`, data)
  }
  /**
   * @param  {IRefreshTokenDTO} data
   * @returns Observable
   */
  refreshToken(data:IRefreshTokenDTO | null): Observable<IResponse<IRefreshTokenDTO>>{
    return this.http.post<IResponse<IRefreshTokenDTO>>(`${this.baseUrl}/${this.path}/${this.refreshPath}`, data)
  }

  sendRegisterOtp(data:IRegisterOtp): Observable<IResponse<IOtpSendResponse>>{
    return this.http.post<IResponse<IOtpSendResponse>>(`${this.baseUrl}/${this.path}/sendRegisterOtp`, data)
  }

  sendLoginOtp(data:ILoginOtp): Observable<IResponse<IOtpSendResponse>>{
    return this.http.post<IResponse<IOtpSendResponse>>(`${this.baseUrl}/${this.path}/sendLoginOtp`, data)
  }

  changeInfo(data:IChangeInfo): Observable<IResponse<ILoginResponse>>{
    return this.http.post<IResponse<ILoginResponse>>(`${this.baseUrl}/${this.path}/changeInfo`, data)
  }
  
  /** The caller's own details (VULN-042). */
  getProfile(): Observable<IResponse<IProfile>>{
    return this.http.get<IResponse<IProfile>>(`${this.baseUrl}/${this.path}/profile`)
  }

  requestContactChange(data:IContactChangeRequest): Observable<IResponse<IOtpSendResponse>>{
    return this.http.post<IResponse<IOtpSendResponse>>(`${this.baseUrl}/${this.path}/contact/request-change`, data)
  }

  confirmContactChange(data:IContactChangeConfirm): Observable<IResponse<ILoginResponse>>{
    return this.http.post<IResponse<ILoginResponse>>(`${this.baseUrl}/${this.path}/contact/confirm`, data)
  }

  /** Ends the session this refresh token belongs to (VULN-017). */
  logout(refreshToken: string): Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.path}/logout`, { refreshToken })
  }

  /** A password change ends every session; the server returns the pair that keeps this one signed in (VULN-016). */
  changePassword(data:IChangePassword): Observable<IResponse<ILoginResponse>>{
    return this.http.post<IResponse<ILoginResponse>>(`${this.baseUrl}/${this.path}/changePassword`, data)
  }

  forgotPassword(data:IForgotPassword): Observable<IResponse<IOtpSendResponse>>{
    return this.http.post<IResponse<IOtpSendResponse>>(`${this.baseUrl}/${this.path}/sendForgotPasswordOtp`, data)
  }

  resetPassword(data:IResetPassword): Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.path}/resetPassword`, data)
  }
}
