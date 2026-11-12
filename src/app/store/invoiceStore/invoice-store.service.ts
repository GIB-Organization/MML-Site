import { DestroyRef, Injectable, inject } from '@angular/core';
import { InvoiceStore } from './invoice-store.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IErrorResponse } from '../../models/response.interface';
import { InvoicesApiService } from '../../services/api/invoicesApi/invoices-api.service';
import { PlatformService } from '../../services/platform/platform.service';
import { ToasterService } from '../../services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStoreService {
  private api = inject(InvoicesApiService);
  private store = inject(InvoiceStore);
  private platformService = inject(PlatformService);
  private toasterService = inject(ToasterService);

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
  /** Fetches the caller's own invoice as a blob and saves it; somebody else's invoice answers 404 (VULN-024). */
  downloadInvoice(id:string, ref:DestroyRef){
    if(!this.platformService.isPlatformBrowser()) return;
    return this.api.downloadInvoice(id).pipe(takeUntilDestroyed(ref)).subscribe({
      next:(blob)=>{
        const blobUrl = URL.createObjectURL(new Blob([blob], {type: 'application/pdf'}));
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = `invoice-${id}.pdf`;
        anchor.click();
        URL.revokeObjectURL(blobUrl);
      },
      // an error body is a blob here, so no server message is shown
      error:()=>this.toasterService.addError()
    })
  }
}
