import { Injectable, inject } from '@angular/core';
import { IErrorResponse } from '../../models/response.interface';
import { SettingsApiService } from '../../services/api/settingsApi/settings-api.service';
import { SettingsStore } from './settings.store';
import { catchError, firstValueFrom, of, take, tap, timeout } from 'rxjs';
import { LocalStorageService } from '../../services/core/localStorage/local-storage.service';
import { EStorageEnum } from '../../core/enums/storage.enum';
import { IGeneralSettings, ISeoSettings } from '../../models/settings.interface';

const SETTINGS_REQUEST_TIMEOUT_MS = 8000;
const SETTINGS_CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

interface ICachedSettings<T> {
  data: T;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsStoreService {
  private api = inject(SettingsApiService);
  private store = inject(SettingsStore);
  private localStorageService = inject(LocalStorageService);

  private readFromCache<T>(key: EStorageEnum): T | null {
    const raw = this.localStorageService.getStorageElement(key);
    if (!raw) return null;
    try {
      const cached: ICachedSettings<T> = JSON.parse(raw);
      if (!cached?.data || Date.now() > cached.expiresAt) {
        this.localStorageService.removeStorageElement(key);
        return null;
      }
      return cached.data;
    } catch {
      this.localStorageService.removeStorageElement(key);
      return null;
    }
  }

  private writeToCache<T>(key: EStorageEnum, data: T) {
    const cached: ICachedSettings<T> = { data, expiresAt: Date.now() + SETTINGS_CACHE_TTL_MS };
    this.localStorageService.setStorageElement(key, JSON.stringify(cached));
  }

  async getGeneralSettings() {
    if (!this.store.getValue().generalSettings) {
      const cached = this.readFromCache<IGeneralSettings>(EStorageEnum.generalSettings);
      if (cached) {
        this.store.update({ generalSettings: cached });
        return cached;
      }
      this.store.setLoading(true)
      return await firstValueFrom(this.api.getGeneralSettings().pipe(
        timeout(SETTINGS_REQUEST_TIMEOUT_MS),
        tap((res)=>{
          this.store.setLoading(false)
          this.store.update({
            generalSettings: res.result
          })
          this.writeToCache(EStorageEnum.generalSettings, res.result)
        }),
        catchError((err)=>{
          this.store.setLoading(false)
          console.error('getGeneralSettings failed, continuing without it', err)
          return of(null)
        }),
      ))
    }
    return null;
  }
  async getSeoSettings() {
    if (!this.store.getValue().seoSettings) {
      const cached = this.readFromCache<ISeoSettings>(EStorageEnum.seoSettings);
      if (cached) {
        this.store.update({ seoSettings: cached });
        return cached;
      }
      this.store.setLoading(true)
      return await firstValueFrom(this.api.getSeoSettings().pipe(
        timeout(SETTINGS_REQUEST_TIMEOUT_MS),
        tap((res)=>{
          this.store.setLoading(false)
          this.store.update({
            seoSettings: res.result
          })
          this.writeToCache(EStorageEnum.seoSettings, res.result)
        }),
        catchError((err)=>{
          this.store.setLoading(false)
          console.error('getSeoSettings failed, continuing without it', err)
          return of(null)
        }),
      ))
    }
    return null
  }
  // Content pages: always fetch fresh so admin edits show up immediately, no caching.
  async getPrivacyPolicySettings() {
    this.store.setLoading(true)
    return await firstValueFrom(this.api.getPrivacyPolicy().pipe(
      timeout(SETTINGS_REQUEST_TIMEOUT_MS),
      tap((res)=>{
        this.store.setLoading(false)
        this.store.update({
          privacyPolicySettings: res.result
        })
      }),
      catchError((err)=>{
        this.store.setLoading(false)
        console.error('getPrivacyPolicySettings failed, continuing without it', err)
        return of(null)
      }),
    ))
  }
  async getTermsSettings() {
    this.store.setLoading(true)
    return await firstValueFrom(this.api.getTerms().pipe(
      timeout(SETTINGS_REQUEST_TIMEOUT_MS),
      tap((res)=>{
        this.store.setLoading(false)
        this.store.update({
          termsSettings: res.result
        })
      }),
      catchError((err)=>{
        this.store.setLoading(false)
        console.error('getTermsSettings failed, continuing without it', err)
        return of(null)
      }),
    ))
  }
}
