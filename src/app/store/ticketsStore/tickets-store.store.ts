import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ITicketsStore } from './tickets-store.interface';

const initialState = () : ITicketsStore =>{
  return {
    isCreatingTicket:false,
    tickets:[],
  } 
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'TicketsStore', resettable: true })
export class TicketsStore extends Store<ITicketsStore> {

  constructor() { super(initialState()) }
}
