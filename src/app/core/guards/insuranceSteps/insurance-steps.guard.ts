import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InsuranceInquireStoreQueryService } from '../../../store/insuranceInquireStore/insurance-inquire-store.query';

const insuranceInquireQuery = () => {
  return inject(InsuranceInquireStoreQueryService);
};
const router = () => {
  return inject(Router)
}

export const insuranceAdditionalData: CanActivateFn = (route, state) => {
  if(insuranceInquireQuery().inquireResponse.refId){
    return true
  }
  router().navigate(['/'])
  return false
};
