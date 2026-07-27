import { Injectable, inject } from '@angular/core';
import { InsuranceInquireApiService } from '../../services/api/insuranceInquireApi/insurance-inquire-api.service';
import { IInsuranceInquireDTO } from '../../models/insuranceInquire.interface';
import { InsuranceInquireStoreStoreService } from './insurance-inquire-store.store';
import { Router } from '@angular/router';
import { ERoutes } from '../../core/enums';
import { take } from 'rxjs';
import { IAdditionalData } from '../../models/additionalData.interface';
import { InsuranceInquireStoreQueryService } from './insurance-inquire-store.query';

@Injectable({
  providedIn: 'root'
})
export class InsuranceInquireStoreService {
  private api = inject(InsuranceInquireApiService);
  private store = inject(InsuranceInquireStoreStoreService);
  private insuranceInquireStoreQueryService = inject(InsuranceInquireStoreQueryService);
  private router = inject(Router);
  /**
   * @param  {IInsuranceInquireDTO} data
   */
  inquireInsurance(data:IInsuranceInquireDTO){
    this.store.setLoading(true)
    this.api.inquireInsurance(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.store.update({inquireResponse: res.result});
        this.router.navigate([`${ERoutes.insuranceShow}/${ERoutes.additionalData}`]);
      },
      complete:() => this.store.setLoading(false),
      error:() => this.store.setLoading(false),
    });
  }
  /**
   * @param  {IAdditionalData} data
   */
  additionalDataPost(data:IAdditionalData){
    this.store.setLoading(true)
    this.api.postAdditionalData({...data, refId: this.insuranceInquireStoreQueryService.inquireResponse.refId??''}).pipe(take(1)).subscribe({
      next: (res) => {
        // Pricing (duration/deductible tiers) is stored for a future compare-offers redesign
        // to render - no MMP UI consumes it yet this phase.
        this.store.update({pricing: res.result.pricing});
        this.router.navigate([`${ERoutes.insuranceShow}/${ERoutes.compareOffers}`]);
      },
      complete:() => this.store.setLoading(false),
      error:() => this.store.setLoading(false),
    });
  }
}
