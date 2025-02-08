import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { IStorageModel } from '../../../models/storage.interface';
import { EStorageEnum } from '../../../core/enums/storage.enum';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements IStorageModel{
  #platformId = inject(PLATFORM_ID);
  
  getStorageElement(name: EStorageEnum) {
    if(isPlatformBrowser(this.#platformId)) return localStorage.getItem(name);
    return null
  }
  setStorageElement(name: EStorageEnum, value: any) {
    if(isPlatformBrowser(this.#platformId)) localStorage.setItem(name, value);
  }
  removeStorageElement(name: EStorageEnum) {
    isPlatformBrowser(this.#platformId) && localStorage.removeItem(name);
  }
}
