import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../../models/response.interface';
import { IGeneralSettings, ISeoSettings } from '../../../models/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'appSettings'
  private http = inject(HttpClient)
  /**
   * @returns Observable
   */
  getGeneralSettings(): Observable<IResponse<IGeneralSettings>> {
    return this.http.get<IResponse<IGeneralSettings>>(`${this.baseUrl}/${this.path}/getGeneralSettings`);
  }
  /**
   * @returns Observable
   */
  getSeoSettings(): Observable<IResponse<ISeoSettings>> {
    return this.http.get<IResponse<ISeoSettings>>(`${this.baseUrl}/${this.path}/getSeoSettings`);
  }
}
