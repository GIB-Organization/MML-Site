import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilter } from '../../../models/layout-models/filter.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagingResponse } from '../../../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterApiService {
  #http = inject(HttpClient)

  getFilteredData(url:string, params:IFilter):Observable<IPagingResponse<any>>{
    let httpParams = new HttpParams()
    httpParams = httpParams.set('limit', params.limit)
    httpParams = httpParams.set('page', params.page)
    return this.#http.get<IPagingResponse<any>>(`${url}`, {params:httpParams})
  }
}
