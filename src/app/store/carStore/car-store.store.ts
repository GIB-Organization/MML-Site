import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ICarStore } from './car-store.interface';

const initValue = () : ICarStore =>{
  return {
    cars:[]
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'CarStore', resettable: true})
export class CarStore extends Store<ICarStore> {

  constructor() { super(initValue()) }
}
