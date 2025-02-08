import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ICarStore } from './car-store.interface';
import { CarStore } from './car-store.store';

@Injectable({
  providedIn: 'root'
})
export class CarStoreQuery extends Query<ICarStore> {

  constructor(private _store: CarStore) { 
    super(_store)
  }

  get cars$(){
    return this.select(state=> state.cars);
  }

  
  get isDeleting$(){
    return this.select(state=> state.isDeleting);
  }
}
