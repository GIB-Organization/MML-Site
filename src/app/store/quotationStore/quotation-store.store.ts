import { Injectable } from '@angular/core';
import { IQuotationStore } from './quotation-store.interface';
import { Store, StoreConfig } from '@datorama/akita';

const initialState = () : IQuotationStore =>{
  return {
    quotations:[]
  } 
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'QuotationStore', resettable: true })
export class QuotationStore extends Store<IQuotationStore> {

  constructor() { super(initialState()) }
}
