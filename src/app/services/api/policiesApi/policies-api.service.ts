import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPolicy } from '../../../models/policy.interface';

@Injectable({
  providedIn: 'root'
})
export class PoliciesApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'policy'
  private http = inject(HttpClient)

  getAllPolicies(): Observable<IPolicy[]>{
    return this.http.get<IPolicy[]>(`${this.baseUrl}/${this.path}/getAllPolicy`)
  }
  getPolicyFile(id:string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${this.path}/getPolicyFileById?policyId=${id}`)
  }

  
}
