import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { Observable } from 'rxjs';
import { ICity, ICountry, IRegion } from '../../../models/address.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'lookup'
  private http = inject(HttpClient)
  /**
   * @returns Observable
   */
  getAllCountries():Observable<ICountry[]>{
    return this.http.get<ICountry[]>(`${this.baseUrl}/${this.path}/getAllCountries`);
  }
  /**
   * @returns Observable
   */
  getAllRegions():Observable<IRegion[]>{
    return this.http.get<IRegion[]>(`${this.baseUrl}/${this.path}/getAllRegions`);
  }
  /**
   * @returns Observable
   */
  getAllCities():Observable<ICity[]>{
    return this.http.get<ICity[]>(`${this.baseUrl}/${this.path}/getAllCites`);
  }
}
