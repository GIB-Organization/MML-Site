import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { IInsuranceInquireDTO, IInsuranceInquireResponse } from '../../../models/insuranceInquire.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAdditionalData } from '../../../models/additionalData.interface';
import { IResponse } from '../../../models/response.interface';
import { ICompany } from '../../../models/companies.interface';

@Injectable({
  providedIn: 'root'
})
export class InsuranceInquireApiService {

  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'basicInfo'
  private http = inject(HttpClient)
  /**
   * @param  {IInsuranceInquireDTO} data
   * @returns Observable
   */
  inquireInsurance(data: IInsuranceInquireDTO): Observable<IResponse<IInsuranceInquireResponse>>{
    return this.http.post<IResponse<IInsuranceInquireResponse>>(`${this.baseUrl}/${this.path}/inquire`, data)
  }

  postAdditionalData(data:IAdditionalData):Observable<IResponse<ICompany[]>>{
    return this.http.post<IResponse<ICompany[]>>(`${this.baseUrl}/${this.path}/additionalData`, data)
  }
}
