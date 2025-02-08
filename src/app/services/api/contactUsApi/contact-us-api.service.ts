import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { IContactUs } from '../../../models/contactUs.interface';
import { IResponse } from '../../../models/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsApiService {
  
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'basicInfo'
  private http = inject(HttpClient)
  
  contactUs(data:IContactUs):Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.path}/contactUs`, data);
  }
}
