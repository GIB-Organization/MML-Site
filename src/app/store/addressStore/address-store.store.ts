import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IAddressStore } from './address-store.interface';

const initValue = () : IAddressStore =>{
  return {
    countries:[],
    regions:[],
    cities:[]
  }
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'AddressStore'})
export class AddressStore extends Store<IAddressStore> {

  constructor() { 
    super(initValue())
  }
}
