import { Injectable } from '@angular/core';
import { IPoliciesStore } from './policies-store.interface';
import { Store, StoreConfig } from '@datorama/akita';
import { EPolicyNajmStatus, EPolicyStatus } from '../../core/enums';

const initialState = () : IPoliciesStore =>{
  return {
    policies:[],
    fileIsLoading: false,
  } 
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'PoliciesStore', resettable: true })
export class PoliciesStore extends Store<IPoliciesStore> {

  constructor() { super(initialState()) }
}
