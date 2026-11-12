import { FormControl } from "@angular/forms";

export interface ILoginDTO {
    email?: string;
    password?: string;
    otpCode?: string | null;
}
export interface ILoginDTOFormGroup {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    otpCode?: FormControl<string | null>;
}

export interface IRegisterDTO {
  fullName: string | null;
  nationalId: string | null;
  phoneNumber: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  agreeTerms: boolean | null;
  otpCode?: string | null;
}
export interface IRegisterDTOFormGroup {
  fullName: FormControl<string | null>;
  nationalId: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  agreeTerms: FormControl<boolean | null>;
  otpCode?: FormControl<string | null>;
}

export interface IRefreshTokenDTO {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  userId?: string;
  username?: string;
  bankName?: string;
  email?: string;
  phoneNumber?: string;
  iban?: string;
  token?: IRefreshTokenDTO;
  fullName?: string;
  nationalId?: string;
}

export type IRegisterOtp = Pick<IRegisterDTO, 'nationalId' | 'phoneNumber'>;
export type ILoginOtp = Pick<IRegisterDTO, 'email' | 'password'>;

export interface IChangeInfo{
  phoneNumber?: string,
  fullName: string,
  email?: string
}
/** E-mail and mobile number change in two steps: password + code on the NEW value (VULN-015). */
export interface IContactChangeRequest{
  channel: 'email' | 'phone',
  newValue: string,
  currentPassword: string
}
export interface IContactChangeConfirm{
  challengeId: string,
  channel: 'email' | 'phone',
  newValue: string,
  code: string
}
/** The signed-in customer's own details, from GET account/profile (VULN-042): they are no longer carried inside the access token. */
export interface IProfile {
  userId?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  nationalId?: string;
  bankName?: string;
  iban?: string;
}
export interface IChangeInfoFormGroup{
  phoneNumber: FormControl<string | null>,
  fullName: FormControl<string | null>,
  email: FormControl<string | null>
}

export interface IChangePassword{
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}
export interface IChangePasswordFormGroup{
  oldPassword: FormControl<string | null>,
  newPassword: FormControl<string | null>,
  confirmPassword: FormControl<string | null>
}

export interface ILegacyTokenUser{
  nameid: string;
  fullName: string;
  phoneNumber?: string;
  email?: string;
  nationalId?: string;
  bankName?: string;
  iban?: string;
  expireTime?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
}

export interface IForgotPassword{
  email: string,
  nationalId: string
}
export interface IForgotPasswordFormGroup{
  email: FormControl<string>,
  nationalId: FormControl<string | null>
}

/** What the server returns after a code was requested. The code itself is only delivered by SMS (VULN-002, VULN-011). */
export interface IOtpSendResponse {
  challengeId: string,
  expiresInSeconds: number,
  resendAfterSeconds?: number,
}

export type IForgotPasswordResult = IOtpSendResponse;

export interface IResetPassword{
  otp: string,
  challengeId?: string,
  newPassword:string,
}

export interface IResetPasswordFormGroup{
  otp: FormControl<string>,
  newPassword:FormControl<string>,
  confirmPassword:FormControl<string>,
}
