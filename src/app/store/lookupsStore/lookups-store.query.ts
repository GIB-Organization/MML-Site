import { Injectable, inject } from '@angular/core';
import { Query } from '@datorama/akita';
import { ILookupStore } from './lookups-store.interface';
import { LookupsStore } from './lookups-store.store';
import { LanguageService } from '../../services/language/language.service';
import { TLookupNameKey } from '../../models/lookup.interface';

@Injectable({
  providedIn: 'root'
})
export class LookupsStoreQuery extends Query<ILookupStore> {
  translate = inject(LanguageService);
  get lookups(){
    return this.getValue().lookups??{};
  }
  get defaultLookups$(){
    return this.select('defaultLookups');
  }
  get defaultLookups(){
    return this.getValue().defaultLookups;
  }
  get lookupNameKey():TLookupNameKey{
    return this.translate.handleBackendLocalKeys('name');
  }

  constructor(private _store:LookupsStore) { 
    super(_store)
  }
}
