import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentStoreService } from '../../store/paymentStore/payment-store.service';
import { PaymentStoreQuery } from '../../store/paymentStore/payment-store.query';
import { BaseLinkComponentComponent } from '../../components/base-components/base-link-component/base-link-component.component';
import { BaseImageComponentComponent } from '../../components/base-components/base-image-component/base-image-component.component';
import { EPaymentStatus, ERoutes } from '../../core/enums';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingContentComponentComponent } from '../../components/shared-components/loading-content-component/loading-content-component.component';

@Component({
  selector: 'app-payment-status-view',
  standalone: true,
  imports: [BaseLinkComponentComponent, BaseImageComponentComponent, TranslateModule, UpperCasePipe, LoadingContentComponentComponent],
  templateUrl: './payment-status-view.component.html',
  styleUrl: './payment-status-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusViewComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute)
  paymentStoreService = inject(PaymentStoreService)
  paymentStoreQuery = inject(PaymentStoreQuery)
  checkoutStatus = toSignal(this.paymentStoreQuery.checkoutStatus$);
  isLoading = toSignal(this.paymentStoreQuery.selectLoading());
  get ERoutes(){
    return ERoutes;
  } 
  get EPaymentStatus(){
    return EPaymentStatus;
  }

  ngOnInit(): void {
      const PARAMS = this.activatedRoute.snapshot.queryParams as {id:string, resourcePath:string};
      this.paymentStoreService.getPaymentStatus(PARAMS.id, PARAMS.resourcePath);
  }
}
