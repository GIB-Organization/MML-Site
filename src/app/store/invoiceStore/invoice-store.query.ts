import { inject, Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IInvoiceStore } from './invoice-store.interface';
import { InvoiceStore } from './invoice-store.store';
import { LanguageService } from '../../services/language/language.service';
import { TInvoiceDetailsKey } from '../../models/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStoreQuery extends Query<IInvoiceStore> {
  translate = inject(LanguageService);
  constructor(private _store: InvoiceStore) { 
    super(_store)
  }

  get invoices$(){
    return this.select(state=> state.invoices);
  }
  get invoices(){
    return this._store.getValue().invoices;
  }
  get detailsKey(): TInvoiceDetailsKey {
    return this.translate.handleBackendLocalKeys('details')
  }
}
