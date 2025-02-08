import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IAuthStore } from './auth-store.interface';

const initValue = () : IAuthStore =>{
  return {
    
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'AuthStore', resettable: true})
export class AuthStore extends Store<IAuthStore> {

  constructor() { super(initValue()) }
}
