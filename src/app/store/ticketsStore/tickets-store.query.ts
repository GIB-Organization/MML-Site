import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ITicketsStore } from './tickets-store.interface';
import { TicketsStore } from './tickets-store.store';

@Injectable({
  providedIn: 'root'
})
export class TicketsStoreQuery extends Query<ITicketsStore>{
  constructor(private _store : TicketsStore) { super(_store) }

  get tickets(){
    return this._store.getValue().tickets
  }
  get tickets$(){
    return this.select(state=> state.tickets)
  }
  get isCreatingTicket$(){
    return this.select(state=> state.isCreatingTicket)
  }
}
