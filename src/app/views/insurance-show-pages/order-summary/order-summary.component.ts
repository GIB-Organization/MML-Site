import { ConstantsService } from './../../../services/core/constants/constants.service';
import { PaymentStoreQuery } from '../../../store/paymentStore/payment-store.query';
import { InsuranceInquireStoreQueryService } from './../../../store/insuranceInquireStore/insurance-inquire-store.query';
import { BaseLinkComponentComponent } from './../../../components/base-components/base-link-component/base-link-component.component';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLabelComponentComponent } from '../../../components/base-components/base-label-component/base-label-component.component';
import { BaseImageComponentComponent } from '../../../components/base-components/base-image-component/base-image-component.component';
import { DividerModule } from 'primeng/divider';
import { InputOtpModule } from 'primeng/inputotp';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { SettingsQuery } from '../../../store/settings/settings.query';
import { TitleBoxComponentComponent } from '../../../components/views-components/compare-offers/title-box-component/title-box-component.component';
import { QuotationStoreQuery } from '../../../store/quotationStore/quotation-store.query';
import { EPaymentsTypes, ERoutes } from '../../../core/enums';
import { PaymentStoreService } from '../../../store/paymentStore/payment-store.service';
import { IBenefit } from '../../../models/quotation.interface';
import { CarPalletComponentComponent } from '../../../components/views-components/compare-offers/car-pallet-component/car-pallet-component.component';
import { ICheckoutDataFormGroup, ICreateCheckoutDTO } from '../../../models/checkout.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VALIDATORS } from '../../../core/validations/global.validators';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputValidationAlertComponentComponent } from '../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [TranslateModule, BaseLabelComponentComponent, BaseImageComponentComponent, DividerModule, InputOtpModule, BaseButtonComponentComponent, BaseLinkComponentComponent, UpperCasePipe, CurrencyPipe, TitleBoxComponentComponent, DatePipe, CarPalletComponentComponent, ReactiveFormsModule, InputNumberModule, InputValidationAlertComponentComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {
 ref = inject(DestroyRef);
 settingsQuery = inject(SettingsQuery);
 authStoreQuery = inject(AuthStoreQuery);
 fb = inject(FormBuilder);
 quotationStoreQuery = inject(QuotationStoreQuery);
 paymentStoreService = inject(PaymentStoreService);
 paymentStoreQuery = inject(PaymentStoreQuery);
 constantsService = inject(ConstantsService);
 insuranceInquireStoreQuery = inject(InsuranceInquireStoreQueryService);
 isLoading = toSignal(this.paymentStoreQuery.selectLoading());
 form = this.fb.nonNullable.group<ICheckoutDataFormGroup>({
  bankName: this.fb.nonNullable.control(this.authStoreQuery.bankName, [Validators.required]),
  iban: this.fb.nonNullable.control(this.authStoreQuery.iban, [Validators.required]),
  phoneNumber: this.fb.nonNullable.control(this.authStoreQuery.phoneNumber, [VALIDATORS['phone']]),
  email: this.fb.nonNullable.control(this.authStoreQuery.email, [VALIDATORS['email']]),
  paymentMethod: this.fb.nonNullable.control(EPaymentsTypes.visa),
  termsConditions: this.fb.nonNullable.control(true, [Validators.requiredTrue]),
 })
 get fullName(){
  return this.insuranceInquireStoreQuery.inquireResponse.firstName + ' ' + this.insuranceInquireStoreQuery.inquireResponse.fatherName
 }
 get vehicleDesc(){
  return `${this.insuranceInquireStoreQuery.inquireResponse.model} ${this.insuranceInquireStoreQuery.inquireResponse.maker} ${this.insuranceInquireStoreQuery.inquireResponse.modelYear}`
 }

 get ERoutes(){
  return ERoutes
 }

 benifitName(item:IBenefit){
  return (item as any)[this.quotationStoreQuery.benefitNameKey];
 }

 get formGetter(){
  return this.form
 }

 get bankName(){
  return this.formGetter.controls.bankName
 }
 get iban(){
  return this.formGetter.controls.iban
 }
 get email(){
  return this.formGetter.controls.email
 }
 get phone(){
  return this.formGetter.controls.phoneNumber
 }
 get termsConditions(){
  return this.formGetter.controls.termsConditions
 }
 get paymentMethodId(){
  return this.formGetter.controls.paymentMethod
 }

 createCheckout(){
  if(this.formGetter.valid){
    const DATA:ICreateCheckoutDTO = {
      productId: this.quotationStoreQuery.selectedQuotationData?.choosedProduct.productId??'',
      companyId: this.quotationStoreQuery.selectedQuotationData?.company.insuranceCompanyID??0,
      selectedBenfitCodes:[
        ...(this.quotationStoreQuery.selectedQuotationData?.choosedBenefits??[]).map((item:IBenefit)=> item.benefitCode)
      ],
      totalAmount: this.quotationStoreQuery.selectedQuotationData?.choosedProduct.productPrice??0,
      referenceId: this.insuranceInquireStoreQuery.inquireResponse.refId??'',
      bankName: this.bankName.value,
      iban: this.iban.value,
      phoneNumber: `${this.phone.value}`,
      email: this.email.value,
      paymentMethod:this.paymentMethodId.value,
    }
    this.paymentStoreQuery.setPaymentMethod = (this.paymentMethodId.value as EPaymentsTypes);
    this.paymentStoreService.createCheckout(DATA, this.ref)
  }
 }
}
