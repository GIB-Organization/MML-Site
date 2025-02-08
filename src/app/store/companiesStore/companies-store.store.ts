import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ICompaniesStore } from './companies-store.interface';

const initialState : ICompaniesStore ={} 

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'CompaniesStore', resettable: true })
export class CompaniesStore extends Store<ICompaniesStore>{

  constructor() { super(initialState) }
}
