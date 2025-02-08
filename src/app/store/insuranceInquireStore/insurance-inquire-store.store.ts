import { Injectable, signal } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IInsuranceInquireStore } from './insurance-inquire-store.interface';

const initialState : IInsuranceInquireStore ={
  inquireResponse:{}
} 

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'InsuranceInquireStore', resettable: true })
export class InsuranceInquireStoreStoreService extends Store<IInsuranceInquireStore> {
  constructor() { 
    super(initialState)
  }
}
