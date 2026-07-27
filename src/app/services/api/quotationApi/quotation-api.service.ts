import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { IQuotation } from '../../../models/quotation.interface';
import { IMmpQuoteRequest, IMmpQuoteResult } from '../../../models/mmpOffer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'quotation'
  private http = inject(HttpClient)

  getQuote(companyID:number, requestReferenceID: string): Observable<IQuotation[]>{
    return this.http.get<IQuotation[]>(`${this.baseUrl}/${this.path}/quote?referenceId=${requestReferenceID}&insuranceCompanyID=${companyID}`)
  }

  // MMP: POST the quote request; the backend factory routes it to Tameeni and returns the
  // flat, enriched compare-offers result (company + premium/VAT/total + coverage limits).
  getMmpQuote(companyID:number, request: IMmpQuoteRequest): Observable<IMmpQuoteResult>{
    return this.http.post<IMmpQuoteResult>(`${this.baseUrl}/${this.path}/quote?insuranceCompanyID=${companyID}`, request)
  }
}
