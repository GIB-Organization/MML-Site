import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { SettingsQuery } from '../../../../store/settings/settings.query';
import { EQuotationsTabs } from '../../../../core/enums/quotations.enum';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { DropdownModule } from 'primeng/dropdown';
import { CompaniesStoreQuery } from '../../../../store/companiesStore/companies-store.query';
import { SortingService } from '../../../../services/sorting/sorting.service';
import { ESortingEnum } from '../../../../core/enums';
import { ICompany } from '../../../../models/companies.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quotations-filter',
  standalone: true,
  imports: [BaseButtonComponentComponent, TranslateModule, CurrencyPipe, BaseLabelComponentComponent, DropdownModule, FormsModule],
  templateUrl: './quotations-filter.component.html',
  styleUrl: './quotations-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[{provide:SortingService , useClass: SortingService}]
})
export class QuotationsFilterComponent {
  companiesStoreQuery = inject(CompaniesStoreQuery);
  settingsQuery = inject(SettingsQuery);
  sortingService = inject(SortingService);
  activeTab = model<EQuotationsTabs>(EQuotationsTabs.thirdParty);
  sortingModel = model<ESortingEnum|null>(null);
  companyModel= model<ICompany|null>(null)
  isAgencyModel= model<boolean>(true)

  get EQuotationsTabs(){
    return EQuotationsTabs
  }

  setActiveTab(tab:EQuotationsTabs){
    this.activeTab.set(tab);
  }
 
  setActiveTabClasses(tab:EQuotationsTabs){
    return this.activeTab() === tab ? 'btn-primary text-white':'btn-light'
  }
}
