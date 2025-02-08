import { SettingsQuery } from './../../../store/settings/settings.query';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DeferBlockComponentComponent } from '../../../components/shared-components/defer-block-component/defer-block-component.component';
import { EmptyDataComponentComponent } from '../../../components/shared-components/empty-data-component/empty-data-component.component';
import { ShadowBoxComponentComponent } from '../../../components/views-components/profile/shadow-box-component/shadow-box-component.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { InvoiceStoreQuery } from '../../../store/invoiceStore/invoice-store.query';
import { InvoiceStoreService } from '../../../store/invoiceStore/invoice-store.service';
import { BaseLinkComponentComponent } from '../../../components/base-components/base-link-component/base-link-component.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingContentComponentComponent } from '../../../components/shared-components/loading-content-component/loading-content-component.component';
import { DownloadService } from '../../../services/download/download.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-invoices-view',
  standalone: true,
  imports: [LoadingContentComponentComponent, DeferBlockComponentComponent, EmptyDataComponentComponent, ShadowBoxComponentComponent, InputNumberModule, TranslateModule, CurrencyPipe, DividerModule, DatePipe, BaseLinkComponentComponent],
  templateUrl: './invoices-view.component.html',
  styleUrl: './invoices-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesViewComponent implements OnInit{
  
  settingsQuery = inject(SettingsQuery);
  downloadService = inject(DownloadService);
  ref = inject(DestroyRef);
  invoiceStoreQuery = inject(InvoiceStoreQuery);
  invoiceStoreService = inject(InvoiceStoreService);
  invoices = toSignal(this.invoiceStoreQuery.invoices$);
  isLoading = toSignal(this.invoiceStoreQuery.selectLoading());
  title = inject(Title);
  translate = inject(TranslateService);
  ngOnInit(): void {
    this.title.setTitle(this.translate.instant('views.profile.invoices.title'))
    this.invoiceStoreService.getAllInvoices(this.ref);
  }
}
