import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IInvoiceStore } from './invoice-store.interface';

const initValue = () : IInvoiceStore =>{
  return {
    invoices:[]
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'InvoiceStore', resettable: true})
export class InvoiceStore extends Store<IInvoiceStore> {

  constructor() { super(initValue()) }
}
