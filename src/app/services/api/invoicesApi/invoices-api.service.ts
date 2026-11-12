import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { Observable } from 'rxjs';
import { IResponse } from '../../../models/response.interface';
import { IInvoice } from '../../../models/invoice.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoicesApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'invoices'
  private http = inject(HttpClient)
  
  /** The PDF is private (VULN-024): it is fetched with the Bearer token, an anchor cannot carry one. */
  downloadInvoice(id:string):Observable<Blob>{
    return this.http.get(`${this.baseUrl}/${this.path}/${encodeURIComponent(id)}/download`, { responseType: 'blob' });
  }

  getAllInvoices():Observable<IResponse<IInvoice[]>>{
    return this.http.get<IResponse<IInvoice[]>>(`${this.baseUrl}/${this.path}/getAllInvoices`);
  }
}
