import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { ELookupCategory } from '../../../core/enums/lookups.enum';
import { ILookup, ILookupCategories } from '../../../models/lookup.interface';
import { Observable } from 'rxjs';
import { ICity, ICountry, IRegion } from '../../../models/address.interface';

@Injectable({
  providedIn: 'root'
})
export class LookupsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'lookup'
  private http = inject(HttpClient)
  /**
   * @param  {ELookupCategory[]} ids
   */
  getLookupsByCategoriesIds(ids:ELookupCategory[]): Observable<ILookupCategories> {
    return this.http.post<ILookupCategories>(`${this.baseUrl}/${this.path}/getLoockupsByCategoriesIds`, ids);
  }
  /**
   * @param  {ELookupCategory} id
   */
  getLookupById(id:ELookupCategory):Observable<ILookup>{
    return this.http.get<ILookup>(`${this.baseUrl}/${this.path}?id=${id}`);
  }
  
}
