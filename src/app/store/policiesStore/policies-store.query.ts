import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IPoliciesStore } from './policies-store.interface';
import { PoliciesStore } from './policies-store.store';

@Injectable({
  providedIn: 'root'
})
export class PoliciesStoreQuery extends Query<IPoliciesStore>{
  constructor(private _store : PoliciesStore) { super(_store) }

  get policies(){
    return this._store.getValue().policies
  }
  get policies$(){
    return this.select(state=> state.policies)
  }
  get fileIsLoading$(){
    return this.select(state=> state.fileIsLoading);
  }
}
