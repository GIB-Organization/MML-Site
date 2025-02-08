import { Injectable, inject } from '@angular/core';
import { Query } from '@datorama/akita';
import { IAddressStore } from './address-store.interface';
import { AddressStore } from './address-store.store';
import { LanguageService } from '../../services/language/language.service';
import { TAddressNameKey } from '../../models/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressStoreQuery extends Query<IAddressStore> {
  translate = inject(LanguageService);
  constructor(private _store: AddressStore) {
    super(_store)
  }

  get countries(){
    return this._store.getValue().countries
  }
  get regions(){
    return this._store.getValue().regions
  }
  get cities(){
    return this._store.getValue().cities
  }
  get keyName():TAddressNameKey{
    return this.translate.handleBackendLocalKeys('name')
  }
}
