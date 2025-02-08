import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { ICompany } from '../../../models/companies.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'insuranceCompany'
  private http = inject(HttpClient)

  getCompanies(): Observable<ICompany[]>{
    return this.http.get<ICompany[]>(`${this.baseUrl}/${this.path}/getAllCompanies`)
  }
}
