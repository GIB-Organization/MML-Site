import { Injectable, inject } from '@angular/core';
import { CompaniesStore } from './companies-store.store';
import { CompaniesApiService } from '../../services/api/companiesApi/companies-api.service';
import { take } from 'rxjs';
import { ICompany } from '../../models/companies.interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesStoreService {
  private api = inject(CompaniesApiService);
  private store = inject(CompaniesStore);

  getCompanies(){
    this.store.setLoading(true)
    this.api.getCompanies().pipe(take(1)).subscribe({
      next: (res) => {
        this.store.update({companies: res});
      },
      complete:() => this.store.setLoading(false),
      error:() => this.store.setLoading(false),
    });
  }
  /**
   * @param  {ICompany[]} companies
   */
  setCompanies(companies:ICompany[]){
    this.store.update({companies: companies})
  }
}
