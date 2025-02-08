import { inject, Injectable } from '@angular/core';
import { OtpStartegy } from './otp-strategy.service';
import { AuthDialogService } from './auth-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class OtpFormService {
  
  public OtpStartegy = inject(OtpStartegy)
  public authDialogService = inject(AuthDialogService)

  sendOtp(otp:number|null){
    this.OtpStartegy.setStartegy(this.authDialogService.otpDialogType);
    this.OtpStartegy.strategy.sendOtp(otp);
  }
}



