import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from '../../../models/response.interface';
import { ITicket, ITicketCreate } from '../../../models/ticket.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'supportTickets'
  private http = inject(HttpClient)
  
  getAllTickets():Observable<IResponse<ITicket[]>>{
    return this.http.get<IResponse<ITicket[]>>(`${this.baseUrl}/${this.path}/getAllTickets`);
  }
  
  /**
   * @param  {FormData} data of ITicketCreate
   * @returns Observable
   */
  createTicket(data:any):Observable<IResponse<ITicket>>{
    return this.http.post<IResponse<ITicket>>(`${this.baseUrl}/${this.path}/createTicket`, data);
  }
}
