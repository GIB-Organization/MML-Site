import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { langType } from '../../core/enums/language.enum';
import { TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  translate = inject(TranslateService);
  transferState = inject(TransferState);
  keyState = 'currentLang';

  handleBackendLocalKeys(key:string):string | any{
    const LANG = this.translate.getDefaultLang();
    return `${key}${LANG.charAt(0).toUpperCase() + LANG.charAt(1)}`
  }

  switchLang(lang: langType){
    this.translate.setDefaultLang(lang);
  }

  getCurrentLang(): langType {
    return this.translate.getDefaultLang() as langType;
  }
}
