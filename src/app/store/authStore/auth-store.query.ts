import { inject, Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { distinctUntilChanged } from 'rxjs';
import { isUsableToken } from '../../core/utils/jwt';
import { IAuthStore } from './auth-store.interface';
import { AuthStore } from './auth-store.store';
import { ILoginResponse, IProfile, IRefreshTokenDTO } from '../../models/auth.interface';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreQuery extends Query<IAuthStore> {
  authService = inject(AuthService);
  constructor(private _store: AuthStore) { 
    super(_store)
  }

  get user(){
    return this._store.getValue().authData;
  }
  set setUser(user:ILoginResponse){
    const FROM_TOKEN = this.authService.getUserFromToken((user.token) as IRefreshTokenDTO)
    // a token without contact or bank details (VULN-042) must not wipe what the profile call already filled in
    const KEEP = (({ email, phoneNumber, nationalId, bankName, iban }) => ({ email, phoneNumber, nationalId, bankName, iban }))(this._store.getValue().authData ?? {});
    const DEFINED = Object.fromEntries(Object.entries(FROM_TOKEN).filter(([, v]) => v !== undefined && v !== null && v !== ''));
    const USER: ILoginResponse = { ...KEEP, ...DEFINED, token: FROM_TOKEN.token };
    this._store.update({authData:USER});
    // only the refresh token is kept by the browser; the profile stays in memory (VULN-064)
    this.authService.saveRefresh(USER.token);
  }
  /** Fills the signed-in customer's details from GET account/profile; the token and the session are untouched. */
  setProfile(profile: IProfile){
    const CURRENT = this._store.getValue().authData;
    if (!CURRENT) return;
    const USER: ILoginResponse = { ...CURRENT, ...profile, token: CURRENT.token, userId: CURRENT.userId ?? profile.userId, username: CURRENT.username };
    this._store.update({authData: USER});
  }
  get userId(){
    return this._store.getValue().authData?.userId
  }
  get bankName(){
    return this._store.getValue().authData?.bankName??''
  }
  get email(){
    return this._store.getValue().authData?.email??''
  }
  get phoneNumber(){
    return this._store.getValue().authData?.phoneNumber??''
  }
  get iban(){
    return this._store.getValue().authData?.iban??''
  }
  get userName(){
    return this._store.getValue().authData?.username??''
  }
  get fullName(){
    return this._store.getValue().authData?.fullName??''
  }
  get nationalId(){
    return this._store.getValue().authData?.nationalId??''
  }
  get token(){
    return this._store.getValue().authData?.token??null
  }

  /**
   * "Signed in" means a readable access token that has not ended (VULN-071). A convenience for the screen only: the server checks every request.
   * The token is renewed a minute before it ends, so a healthy session never reads as signed out.
   */
  get isAuthenticated(){
    return isUsableToken(this.token?.accessToken)
  }
  get isAuthenticated$(){
    return this.select(state=> isUsableToken(state.authData?.token?.accessToken)).pipe(distinctUntilChanged());
  }

}
