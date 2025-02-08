import { EPriceDetailCode } from './../../../../core/enums/quotations.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationStoreQuery } from './../../../../store/quotationStore/quotation-store.query';
import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';
import { CompanySpeedRateComponent } from '../company-speed-rate/company-speed-rate.component';
import { SettingsQuery } from '../../../../store/settings/settings.query';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { EQuotationsTabs } from '../../../../core/enums/quotations.enum';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { DropdownModule } from 'primeng/dropdown';
import { IBenefit, IPriceDetail, IQuotation, IQuotationProduct } from '../../../../models/quotation.interface';
import { CompaniesStoreQuery } from '../../../../store/companiesStore/companies-store.query';
import { ICompany } from '../../../../models/companies.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { ERoutes } from '../../../../core/enums';
import { AuthDialogService } from '../../../../services/auth/auth-dialog.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { navigateToCurrentRouteWithNewQueryParams } from '../../../../core/utils/setQueryParams';
import { ConstantsService } from '../../../../services/core/constants/constants.service';

@Component({
  selector: 'app-quotation-box',
  standalone: true,
  imports: [BaseImageComponentComponent, CompanySpeedRateComponent, TranslateModule, CurrencyPipe, BaseButtonComponentComponent, BaseLabelComponentComponent, DropdownModule, ReactiveFormsModule],
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
  choosedBenefits:IBenefit[] = []

  get EQuotationsTabs(){
    return EQuotationsTabs;
  }

  toggleBenefit(benefit:IBenefit, $event:any){
    let ckecked = $event.target.checked;
    let product = this.choosedProduct();
    if(ckecked){
      this.choosedBenefits.push(benefit);
      this.choosedProduct.set({...product, productPrice: ((product.productPrice as number) + this.calculateBenifitWithTax(benefit))});
      this.benifitVatAdd(benefit)
    }else{
      let index = this.choosedBenefits.findIndex(item=>{item.benefitId === benefit.benefitId});
      this.choosedBenefits.splice(index, 1);
      this.choosedProduct.set({...product, productPrice: ((product.productPrice as number) - this.calculateBenifitWithTax(benefit))});
      this.benifitVatRemove(benefit)
    }
  }

  changeProduct(product:IQuotationProduct){
    this.choosedProduct.set(product);
    this.choosedBenefits = [];
  }

  

  isDefaultBenefit(benifit:IBenefit){
    return benifit.benefitPrice === 0
  }

  get getTaxPriceDetailIndex():number | null{
    return this.choosedProduct().priceDetails?.findIndex(item=> item.priceTypeCode === EPriceDetailCode.vat)??null;
  }

  calculateBenifitWithTax(benefit:IBenefit):number{
    return benefit.benefitPrice + (benefit.benefitPrice * this.constants.taxPercentage / 100);
  }

  benifitVatAdd(benefit:IBenefit){
    if(this.getTaxPriceDetailIndex){
      let priceDetails:IPriceDetail[] = JSON.parse(JSON.stringify(this.choosedProduct().priceDetails??[]));
      let priceDetail = priceDetails[this.getTaxPriceDetailIndex];
      priceDetail.priceValue = priceDetail.priceValue + (benefit.benefitPrice * this.constants.taxPercentage / 100);
      this.choosedProduct.update(value=>({...value, priceDetails: priceDetails}))
    }
  }
  benifitVatRemove(benefit:IBenefit){
    if(this.getTaxPriceDetailIndex){
      let priceDetails:IPriceDetail[] = JSON.parse(JSON.stringify(this.choosedProduct().priceDetails??[]));
      let priceDetail = priceDetails[this.getTaxPriceDetailIndex];
      priceDetail.priceValue = priceDetail.priceValue - (benefit.benefitPrice * this.constants.taxPercentage / 100);
      this.choosedProduct.update(value=>({...value, priceDetails: priceDetails}))
    }
  }

  submit(){
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

}
