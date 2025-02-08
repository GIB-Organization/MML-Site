import { Injectable } from '@angular/core';
import { EPaymentsTypes } from '../../../core/enums';
function createArray(n: number) {
  return [...Array(n + 1).keys()]
}
@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  chidrenUnder16List: number[] = createArray(16)
  fiveYearsAccidentsList: number[] = createArray(20)
  yearsHoldingLicenseList: number[] = createArray(50)
  yesNoList: { id: boolean, name: string }[] = [{ id: true, name: 'public.yes' }, { id: false, name: 'public.no' }];

  paymentLogos:{id:EPaymentsTypes,path:string}[] = [
    {
      id:EPaymentsTypes.visa,
      path:'payment/visa.svg'
    },
    {
      id:EPaymentsTypes.master,
      path:'payment/mastercard.svg'
    },
    {
      id:EPaymentsTypes.mada,
      path:'payment/mada.png'
    },
  ]
  taxPercentage : number = 15;
}
