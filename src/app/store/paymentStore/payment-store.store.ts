import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IPaymentStore } from './payment-store.interface';
const initValue = ():IPaymentStore =>{
  return {
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'PaymentStore'})
export class PaymentStore extends Store<IPaymentStore>{

  constructor() { 
    super(initValue())
  }
}
