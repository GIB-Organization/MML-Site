import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateCheckoutDTO, ICreateCheckoutResponse } from '../../../models/checkout.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'payment'
  private http = inject(HttpClient)

  createPaymentCheckout(data:ICreateCheckoutDTO): Observable<ICreateCheckoutResponse>{
    return this.http.post<ICreateCheckoutResponse>(`${this.baseUrl}/${this.path}/createCheckout`, data)
  }

  getPaymentStatus(checkoutId:string, resourcePath:string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${this.path}/GetPaymentStatus?checkoutId=${checkoutId}&resourcePath=${resourcePath}`)
  }
}
