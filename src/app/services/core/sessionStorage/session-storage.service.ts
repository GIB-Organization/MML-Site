import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { IStorageModel } from '../../../models/storage.interface';
import { EStorageEnum } from '../../../core/enums/storage.enum';
import { isPlatformBrowser } from '@angular/common';

/** Same shape as LocalStorageService, but the value is gone when the tab is closed. Safe to call during server rendering. */
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements IStorageModel{
  #platformId = inject(PLATFORM_ID);

  getStorageElement(name: EStorageEnum) {
    if(!isPlatformBrowser(this.#platformId)) return null;
    try { return sessionStorage.getItem(name); } catch { return null; }
  }
  setStorageElement(name: EStorageEnum, value: any) {
    if(!isPlatformBrowser(this.#platformId)) return;
    try { sessionStorage.setItem(name, value); } catch { /* storage blocked: the session just will not survive a reload */ }
  }
  removeStorageElement(name: EStorageEnum) {
    if(!isPlatformBrowser(this.#platformId)) return;
    try { sessionStorage.removeItem(name); } catch { /* nothing to do */ }
  }
}
