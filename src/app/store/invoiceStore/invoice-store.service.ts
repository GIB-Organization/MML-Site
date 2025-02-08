import { DestroyRef, Injectable, inject } from '@angular/core';
import { InvoiceStore } from './invoice-store.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IErrorResponse } from '../../models/response.interface';
import { InvoicesApiService } from '../../services/api/invoicesApi/invoices-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStoreService {
  private api = inject(InvoicesApiService);
  private store = inject(InvoiceStore);

  getAllInvoices(ref:DestroyRef){
    this.store.setLoading(true)
    return this.api.getAllInvoices().pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
            this.store.update({
              invoices:res.result
            })
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err:IErrorResponse)=>{
          this.store.setLoading(false)
        }
    })
  }
}
