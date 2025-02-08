import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketsApiService } from '../../services/api/ticketsApi/tickets-api.service';
import { TicketsStore } from './tickets-store.store';
import { ITicketCreate } from '../../models/ticket.interface';
import { ToasterService } from '../../services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsStoreService {
  private api = inject(TicketsApiService);
  private store = inject(TicketsStore);
  private toaster = inject(ToasterService);

  getAllTickets(ref:DestroyRef){
    this.store.setLoading(true)
    return this.api.getAllTickets().pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
            this.store.update({
              tickets:res.result
            })
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err)=>{
          this.store.setLoading(false)
        }
    })
  }
  createTicket(data:ITicketCreate,ref:DestroyRef, callback?:any){
    this.store.update({isCreatingTicket: true})
    const FORM_DATA = new FormData();
    FORM_DATA.append('Subject', data.subject)
    FORM_DATA.append('Details', data.details)
    FORM_DATA.append('File', data.file)
    return this.api.createTicket(FORM_DATA).pipe(takeUntilDestroyed(ref)).subscribe({
      next:(res)=>{
        this.store.update(state=>({
          tickets:[...state.tickets, res.result],
          isCreatingTicket: false
        }))
        this.toaster.addSuccess();
        callback();
      },
      complete:()=>{this.store.update({isCreatingTicket: false})},
      error:(err)=>{this.store.update({isCreatingTicket: false})}
    })
  }
}
