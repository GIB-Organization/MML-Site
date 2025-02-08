import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthDialogFactory } from '../../core/classes/AuthDialog';
import { EFormType, EOtpType } from '../../core/enums';
import { IAuthDialog } from '../../models/layout-models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  public _AuthDialogFactory = new AuthDialogFactory();
  public otpDialogType: EOtpType = EOtpType.register;
  visibleForm: WritableSignal<IAuthDialog> = signal(this._AuthDialogFactory.createDialogContent(EFormType.login));
  visible = signal(false);

  get EFormType(){
    return EFormType
  }

  openComponent(type : EFormType){
    this.visibleForm.set(this._AuthDialogFactory.createDialogContent( type ))
  }

  openLoginDialog(){
    this.openComponent(EFormType.login);
    this.visible.set(true);
  }
}
