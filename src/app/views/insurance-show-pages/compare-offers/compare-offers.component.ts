import { QuotationStoreQuery } from './../../../store/quotationStore/quotation-store.query';
import { QuotationsFilterComponent } from './../../../components/views-components/compare-offers/quotations-filter/quotations-filter.component';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { TitleBoxComponentComponent } from '../../../components/views-components/compare-offers/title-box-component/title-box-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { CarInfoBoxComponentComponent } from '../../../components/views-components/compare-offers/car-info-box-component/car-info-box-component.component';
import { QuotationBoxComponent } from '../../../components/views-components/compare-offers/quotation-box/quotation-box.component';
import { EQuotationsTabs } from '../../../core/enums/quotations.enum';
import { DeferBlockComponentComponent } from '../../../components/shared-components/defer-block-component/defer-block-component.component';
import { QuotationStoreService } from '../../../store/quotationStore/quotation-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuotationsFilterPipe } from '../../../core/pipes/quotationsFilter/quotations-filter.pipe';
import { IQuotationsFilter } from '../../../models/quotation.interface';
import { QuotationStartegyClass } from '../../../core/classes/QuotationStartegy';

@Component({
  selector: 'app-compare-offers',
  standalone: true,
  imports: [TitleBoxComponentComponent, TranslateModule, CarInfoBoxComponentComponent, QuotationsFilterComponent, QuotationBoxComponent, DeferBlockComponentComponent, QuotationsFilterPipe],
  templateUrl: './compare-offers.component.html',
  styleUrl: './compare-offers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareOffersComponent implements OnInit, OnDestroy{
  
  quotationStoreService = inject(QuotationStoreService);
  QuotationStoreQuery = inject(QuotationStoreQuery);
  quotations = toSignal(this.QuotationStoreQuery.quotations$);
  quotationStartegy = new QuotationStartegyClass();
  filter = signal<IQuotationsFilter>({
    company:null,
    sorting:null,
    isAgency:true,
    type: EQuotationsTabs.thirdParty
  });
  ngOnInit(){
    this.quotationStoreService.getQuotes();
  }
  ngOnDestroy(): void {
    this.quotationStoreService.resetStore()
  }
  filterChanged(value:any){
    this.filter.set(value);
  }
  get EQuotationsTabs(){
    return EQuotationsTabs;
  }
}
