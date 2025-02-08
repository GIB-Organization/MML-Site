import { Injectable, inject } from '@angular/core';
import { IErrorResponse } from '../../models/response.interface';
import { SettingsApiService } from '../../services/api/settingsApi/settings-api.service';
import { SettingsStore } from './settings.store';
import { catchError, firstValueFrom, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsStoreService {
  private api = inject(SettingsApiService);
  private store = inject(SettingsStore);

  async getGeneralSettings() {
    if (!this.store.getValue().generalSettings) {
      this.store.setLoading(true)
      return await firstValueFrom(this.api.getGeneralSettings().pipe(
        tap((res)=>{
          this.store.setLoading(false)
          this.store.update({
            generalSettings: res.result
          })
        }),
        catchError((err)=>{
          this.store.setLoading(false)
          throw err;
        }),
      ))
    }
    return null;
  }
  async getSeoSettings() {
    if (!this.store.getValue().seoSettings) {
      this.store.setLoading(true)
      return await firstValueFrom(this.api.getSeoSettings().pipe(
        tap((res)=>{
          this.store.setLoading(false)
          this.store.update({
            seoSettings: res.result
          })
        }),
        catchError((err)=>{
          this.store.setLoading(false)
          throw err;
        }),
      ))
    }
    return null
  }
}
