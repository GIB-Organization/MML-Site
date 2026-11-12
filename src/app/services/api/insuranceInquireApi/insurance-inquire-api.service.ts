import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { IInsuranceInquireDTO, IInsuranceInquireResponse, IMmpAdditionalDataResponse } from '../../../models/insuranceInquire.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAdditionalData } from '../../../models/additionalData.interface';
import { IResponse } from '../../../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class InsuranceInquireApiService {

  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'mmp'
  private http = inject(HttpClient)
  /**
   * @param  {IInsuranceInquireDTO} data
   * @returns Observable
   */
  inquireInsurance(data: IInsuranceInquireDTO): Observable<IResponse<IInsuranceInquireResponse>>{
    return this.http.post<IResponse<IInsuranceInquireResponse>>(`${this.baseUrl}/${this.path}/inquire`, data)
  }

  postAdditionalData(data:IAdditionalData, quoteToken?: string):Observable<IResponse<IMmpAdditionalDataResponse>>{
    // the token proves this browser started the inquiry (VULN-022); header only, never URL or body
    const headers = quoteToken ? new HttpHeaders({ 'X-Quote-Token': quoteToken }) : undefined;
    return this.http.post<IResponse<IMmpAdditionalDataResponse>>(`${this.baseUrl}/${this.path}/additionalData`, data, { headers })
  }
}
