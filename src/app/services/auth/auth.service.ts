import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from '../core/localStorage/local-storage.service';
import { EStorageEnum } from '../../core/enums';
import { ILegacyTokenUser, ILoginResponse, IRefreshTokenDTO } from '../../models/auth.interface';
import { payloadFromToken, tokenUserAdapter } from '../../core/utils/payloadfromToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #localstorage = inject(LocalStorageService);

  saveUserToLocal(userData: ILoginResponse){
    this.#localstorage.setStorageElement(EStorageEnum.token, JSON.stringify(userData.token))
    this.#localstorage.setStorageElement(EStorageEnum.user, JSON.stringify(userData))
  }
  getUserFromLocal(){
    const USER = this.#localstorage.getStorageElement(EStorageEnum.user);
    return  USER ? JSON.parse(USER??''):null
  }

  getToken():IRefreshTokenDTO | null{
    const TOKEN = this.#localstorage.getStorageElement(EStorageEnum.token)
    return TOKEN ? JSON.parse(TOKEN??'') : null;
  }

  logout(){
    this.#localstorage.removeStorageElement(EStorageEnum.token);
    this.#localstorage.removeStorageElement(EStorageEnum.user);
  }

  isAuthenticated(){
    return !!this.getToken();
  }

  getUserFromToken(token:IRefreshTokenDTO):ILoginResponse{
    const TOKEN_USER = payloadFromToken(token.accessToken) as ILegacyTokenUser;
    const adaptedUser = tokenUserAdapter(TOKEN_USER, token)
    return adaptedUser
  }
}
