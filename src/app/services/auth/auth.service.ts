import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from '../core/localStorage/local-storage.service';
import { SessionStorageService } from '../core/sessionStorage/session-storage.service';
import { EStorageEnum } from '../../core/enums';
import { ILegacyTokenUser, ILoginResponse, IRefreshTokenDTO } from '../../models/auth.interface';
import { payloadFromToken, tokenUserAdapter } from '../../core/utils/payloadfromToken';

/**
 * What the browser keeps of a session (VULN-064, interim design): only the refresh token, in session storage, so a reload keeps
 * the customer signed in and closing the tab does not. The access token and the profile (national id, IBAN, e-mail, phone) live
 * in memory only. Nothing is written to local storage any more, and keys written by earlier releases are removed.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #localstorage = inject(LocalStorageService);
  #sessionStorage = inject(SessionStorageService);

  /** Keeps the refresh token, and only that, for the length of this tab. */
  saveRefresh(token: IRefreshTokenDTO | undefined | null){
    if(token?.refreshToken) this.#sessionStorage.setStorageElement(EStorageEnum.refreshToken, token.refreshToken);
  }

  getRefresh(): string | null{
    return this.#sessionStorage.getStorageElement(EStorageEnum.refreshToken) || null;
  }

  /** Removes the token and profile that earlier releases left in local storage (they survived browser restarts). */
  purgeLegacy(){
    this.#localstorage.removeStorageElement(EStorageEnum.token);
    this.#localstorage.removeStorageElement(EStorageEnum.user);
  }

  logout(){
    this.#sessionStorage.removeStorageElement(EStorageEnum.refreshToken);
    this.purgeLegacy();
  }

  /** True when a session can be restored after a reload; whether one is active right now is the store's token. */
  hasStoredSession(){
    return !!this.getRefresh();
  }

  getUserFromToken(token:IRefreshTokenDTO):ILoginResponse{
    const TOKEN_USER = payloadFromToken(token.accessToken) as ILegacyTokenUser;
    const adaptedUser = tokenUserAdapter(TOKEN_USER, token)
    return adaptedUser
  }
}
