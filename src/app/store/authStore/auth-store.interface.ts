import { ILoginResponse } from "../../models/auth.interface";

export interface IAuthStore{
  authData?: ILoginResponse,
  otp?:string,
}