import { Injectable, inject } from '@angular/core';
import { AddressStore } from './address-store.store';
import { AddressApiService } from '../../services/api/addressApi/address-api.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressStoreService {
  private api = inject(AddressApiService);
  private store = inject(AddressStore);
  
  getCountries(){
    this.store.setLoading(true)
    this.api.getAllCountries().pipe(take(1)).subscribe({
      next: (res) => {
        this.store.update({countries: res});
      },
      complete:() => this.store.setLoading(false),
    });
  }
  getRegions(){
    this.store.setLoading(true)
    this.api.getAllRegions().pipe(take(1)).subscribe({
      next: (res) => {
        this.store.update({regions: res});
      },
      complete:() => this.store.setLoading(false),
    });
  }
  getCities(){
    this.store.setLoading(true)
    this.api.getAllCities().pipe(take(1)).subscribe({
      next: (res) => {
        this.store.update({cities: res});
      },
      complete:() => this.store.setLoading(false),
    });
  }
}
