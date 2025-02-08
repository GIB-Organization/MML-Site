import { Injectable, inject } from '@angular/core';
import { LookupsApiService } from '../../services/api/lookupsApi/lookups-api.service';
import { LookupsStore } from './lookups-store.store';
import { ELookupCategory } from '../../core/enums/lookups.enum';
import { take } from 'rxjs';
import { IDefaultLookupsCategories, ILookup } from '../../models/lookup.interface';

@Injectable({
  providedIn: 'root'
})
export class LookupsStoreService {
  private api = inject(LookupsApiService);
  private store = inject(LookupsStore);
  
  
  /**
   * @param  {ELookupCategory[]} ids
   */
  getLookupsByCategoriesIds(ids:ELookupCategory[]){
    this.store.setLoading(true)
    this.api.getLookupsByCategoriesIds(ids).pipe(take(1)).subscribe({
      next: (res) => {
        const VALUES = Object.values(res);
        const GET_DEFAULTS = ()=>{
          let DEFAULT:ILookup;
          let DEFAULTS: IDefaultLookupsCategories={};
          VALUES.forEach(value=>{
            DEFAULT = value.find(item=> item.isDefult = true)??value[0];
            DEFAULTS[DEFAULT.categoryId] = DEFAULT;
          })
          return DEFAULTS
        }
        this.store.update({
          lookups: res,
          defaultLookups: GET_DEFAULTS()
        });
      },
      complete:() => this.store.setLoading(false),
    });
  }
  /**
   * @param  {ELookupCategory} id
   */
  getLookupById(id:ELookupCategory){
    this.store.setLoading(true)
    this.api.getLookupById(id).pipe(take(1)).subscribe({
      next: (res) => {
        this.store.update({[id]: res});
      },
      complete:() => this.store.setLoading(false),
    });
  }
}
