import { DestroyRef, inject, Injectable } from '@angular/core';
import { PaymentApiService } from '../../services/api/paymentApi/payment-api.service';
import { PaymentStore } from './payment-store.store';
import { take } from 'rxjs';
import { ICreateCheckoutDTO } from '../../models/checkout.interface';
import { Router } from '@angular/router';
import { ERoutes } from '../../core/enums';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PaymentStoreService {
  private api = inject(PaymentApiService);
  private store = inject(PaymentStore);
  private router = inject(Router);

  createCheckout(data:ICreateCheckoutDTO, ref:DestroyRef){
    this.store.setLoading(true)
    return this.api.createPaymentCheckout(data).pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
            this.store.update({
              checkoutId:res.checkoutId
            })
            this.router.navigate([ERoutes.checkout])
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err)=> {
          this.store.setLoading(false)
        }
    })
  }
  getPaymentStatus(checkoutId:string, resourcePath:string){
    this.store.setLoading(true)
    return this.api.getPaymentStatus(checkoutId, resourcePath).pipe(take(1)).subscribe({
        next:(res)=>{
            this.store.update({
              checkoutStatus:res.result
            })
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err)=>{
          this.store.setLoading(false)
        }
    })
  }
}
