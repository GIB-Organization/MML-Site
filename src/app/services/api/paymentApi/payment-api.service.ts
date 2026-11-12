import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateCheckoutDTO, ICreateCheckoutResponse } from '../../../models/checkout.interface';

import { buildParams } from '../../../core/utils/httpParams';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'payment'
  private http = inject(HttpClient)

  /** The quote token proves this browser created the quote being paid for (VULN-022); it goes in a header, never in the URL or the body. */
  createPaymentCheckout(data:ICreateCheckoutDTO, quoteToken?: string): Observable<ICreateCheckoutResponse>{
    const headers = quoteToken ? new HttpHeaders({ 'X-Quote-Token': quoteToken }) : undefined;
    return this.http.post<ICreateCheckoutResponse>(`${this.baseUrl}/${this.path}/createCheckout`, data, { headers })
  }

  getPaymentStatus(checkoutId:string, resourcePath:string): Observable<any>{
    // the server builds the gateway address from its own stored checkout id and ignores the path; both values are encoded so they can never alter the query (VULN-072)
    return this.http.get<any>(`${this.baseUrl}/${this.path}/GetPaymentStatus`, { params: buildParams({ checkoutId: checkoutId, resourcePath: resourcePath ?? '' }) })
  }
}
