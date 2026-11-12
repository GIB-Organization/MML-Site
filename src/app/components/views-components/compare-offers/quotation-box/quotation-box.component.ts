import { ActivatedRoute, Router } from '@angular/router';
import { QuotationStoreQuery } from './../../../../store/quotationStore/quotation-store.query';
import { ChangeDetectionStrategy, Component, computed, inject, input, model, signal } from '@angular/core';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';
import { CompanySpeedRateComponent } from '../company-speed-rate/company-speed-rate.component';
import { SettingsQuery } from '../../../../store/settings/settings.query';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { EQuotationsTabs } from '../../../../core/enums/quotations.enum';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { DropdownModule } from 'primeng/dropdown';
import { computeQuoteTotals, isDefaultBenefit } from '../../../../core/utils/quotation-totals';
import { IBenefit, IQuotation, IQuotationProduct } from '../../../../models/quotation.interface';
import { CompaniesStoreQuery } from '../../../../store/companiesStore/companies-store.query';
import { ICompany } from '../../../../models/companies.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { ERoutes } from '../../../../core/enums';
import { AuthDialogService } from '../../../../services/auth/auth-dialog.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { navigateToCurrentRouteWithNewQueryParams } from '../../../../core/utils/setQueryParams';
import { ConstantsService } from '../../../../services/core/constants/constants.service';
import { DialogComponentComponent } from '../../../shared-components/dialog-component/dialog-component.component';

@Component({
  selector: 'app-quotation-box',
  standalone: true,
  imports: [BaseImageComponentComponent, CompanySpeedRateComponent, TranslateModule, CurrencyPipe, BaseButtonComponentComponent, BaseLabelComponentComponent, DropdownModule, ReactiveFormsModule, DialogComponentComponent],
  templateUrl: './quotation-box.component.html',
  styleUrl: './quotation-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationBoxComponent{
  constants = inject(ConstantsService);
  settingsQuery = inject(SettingsQuery);
  comprehensiveOrThird = model<EQuotationsTabs>(EQuotationsTabs.thirdParty);
  comprehensivePrice = input<number>();
  companiesStoreQuery = inject(CompaniesStoreQuery)
  quotationStoreQuery = inject(QuotationStoreQuery)
  authDialogService = inject(AuthDialogService)
  authStoreQuery = inject(AuthStoreQuery)
  router = inject(Router)
  route = inject(ActivatedRoute)
  quotation = input<IQuotation>()
  company = input<ICompany>()
  choosedProduct = model<Partial<IQuotationProduct>>({});
  openMobileDialog: boolean = false;

  // The product exactly as the insurer returned it, the customer's choice on it, and the product shown (the first two combined).
  // "derived" is what this component last put into choosedProduct; any other value there (another tab, another product) starts a fresh selection (VULN-074).
  #base: Partial<IQuotationProduct> | null = null;
  #derived: Partial<IQuotationProduct> | null = null;
  #ids = signal<ReadonlySet<string>>(new Set());

  baseProduct = computed(() => {
    const shown = this.choosedProduct();
    return shown === this.#derived && this.#base ? this.#base : shown;
  });
  selectedIds = computed<ReadonlySet<string>>(() => (this.choosedProduct() === this.#derived ? this.#ids() : new Set<string>()));

  /** The optional benefits that are ticked, in the product's own order. */
  get choosedBenefits(): IBenefit[] {
    const ids = this.selectedIds();
    return (this.baseProduct().benefits ?? []).filter(benefit => ids.has(benefit.benefitId) && !isDefaultBenefit(benefit));
  }

  get EQuotationsTabs(){
    return EQuotationsTabs;
  }

  toggleBenefit(benefit:IBenefit, $event:Event){
    const base = this.baseProduct();
    // only a benefit of this product that can be chosen
    if (isDefaultBenefit(benefit) || !(base.benefits ?? []).some(item => item.benefitId === benefit.benefitId)) return;

    const next = new Set(this.selectedIds());
    if (($event.target as HTMLInputElement).checked) next.add(benefit.benefitId); else next.delete(benefit.benefitId);

    const selected = (base.benefits ?? []).filter(item => next.has(item.benefitId) && !isDefaultBenefit(item));
    const shown: Partial<IQuotationProduct> = { ...base, ...computeQuoteTotals(base, selected, this.constants.taxPercentage) };
    this.#base = base;
    this.#derived = shown;
    this.#ids.set(next);
    this.choosedProduct.set(shown);
  }

  changeProduct(product:IQuotationProduct){
    this.#base = null;
    this.#derived = null;
    this.#ids.set(new Set());
    this.choosedProduct.set(product);
  }

  isDefaultBenefit(benifit:IBenefit){
    return isDefaultBenefit(benifit)
  }

  submit(){
    if (this.quotation()?.errors?.length) {
      return;
    }
    this.quotationStoreQuery.setSelectedQuotationData({
      quotation: this.quotation() as IQuotation,
      company: this.company() as ICompany,
      choosedBenefits: this.choosedBenefits,
      choosedProduct: this.choosedProduct() as IQuotationProduct
    })
    if(this.authStoreQuery.isAuthenticated){
      this.router.navigate([`${ERoutes.insuranceShow}/${ERoutes.orderSummary}`]);
    }
    else {
      navigateToCurrentRouteWithNewQueryParams(this.route, this.router, `${ERoutes.insuranceShow}/${ERoutes.orderSummary}`)
      this.authDialogService.openLoginDialog()
    }
  }

  openMobilePopup() {

  }

}
