import { PaymentStoreQuery } from '../../../store/paymentStore/payment-store.query';
import { InsuranceInquireStoreQueryService } from './../../../store/insuranceInquireStore/insurance-inquire-store.query';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLabelComponentComponent } from '../../../components/base-components/base-label-component/base-label-component.component';
import { BaseImageComponentComponent } from '../../../components/base-components/base-image-component/base-image-component.component';
import { DividerModule } from 'primeng/divider';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { SettingsQuery } from '../../../store/settings/settings.query';
import { TitleBoxComponentComponent } from '../../../components/views-components/compare-offers/title-box-component/title-box-component.component';
import { EPaymentsTypes, ERoutes } from '../../../core/enums';
import { PaymentStoreService } from '../../../store/paymentStore/payment-store.service';
import { ICheckoutDataFormGroup, ICreateCheckoutDTO } from '../../../models/checkout.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VALIDATORS } from '../../../core/validations/global.validators';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputValidationAlertComponentComponent } from '../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { ConstantsService } from './../../../services/core/constants/constants.service';
import { LanguageService } from '../../../services/language/language.service';
import { IMmpOffer, IMmpQuoteContext } from '../../../models/mmpOffer.interface';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [TranslateModule, BaseLabelComponentComponent, BaseImageComponentComponent, DividerModule, BaseButtonComponentComponent, CurrencyPipe, TitleBoxComponentComponent, DatePipe, DecimalPipe, ReactiveFormsModule, InputNumberModule, InputValidationAlertComponentComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent {
  ref = inject(DestroyRef);
  settingsQuery = inject(SettingsQuery);
  authStoreQuery = inject(AuthStoreQuery);
  fb = inject(FormBuilder);
  paymentStoreService = inject(PaymentStoreService);
  paymentStoreQuery = inject(PaymentStoreQuery);
  constantsService = inject(ConstantsService);
  language = inject(LanguageService);
  insuranceInquireStoreQuery = inject(InsuranceInquireStoreQueryService);
  isLoading = toSignal(this.paymentStoreQuery.selectLoading());

  offer = signal<IMmpOffer | null>(this.readSession<IMmpOffer>('selectedMmpOffer'));
  context = signal<IMmpQuoteContext | null>(this.readSession<IMmpQuoteContext>('mmpQuoteContext'));

  form = this.fb.nonNullable.group<ICheckoutDataFormGroup>({
    bankName: this.fb.nonNullable.control(this.authStoreQuery.bankName, [Validators.required]),
    iban: this.fb.nonNullable.control(this.authStoreQuery.iban, [Validators.required]),
    phoneNumber: this.fb.nonNullable.control(this.authStoreQuery.phoneNumber, [VALIDATORS['phone']]),
    email: this.fb.nonNullable.control(this.authStoreQuery.email, [VALIDATORS['email']]),
    paymentMethod: this.fb.nonNullable.control(EPaymentsTypes.visa),
    termsConditions: this.fb.nonNullable.control(true, [Validators.requiredTrue]),
  });

  get ERoutes() { return ERoutes; }

  get fullName() {
    const r = this.insuranceInquireStoreQuery.inquireResponse;
    return [r.firstName, r.fatherName, r.grandFatherName, r.familyName].filter(Boolean).join(' ');
  }

  get idNumber() { return this.insuranceInquireStoreQuery.inquireResponse.idNumber; }

  get specialty(): string {
    const key = this.language.handleBackendLocalKeys('subProfessionName');
    return (this.context() as any)?.[key] ?? '';
  }

  get companyName(): string {
    const key = this.language.handleBackendLocalKeys('companyName');
    return (this.offer() as any)?.[key] ?? '';
  }

  get deductibleName(): string {
    const key = this.language.handleBackendLocalKeys('deductibleName');
    return (this.offer() as any)?.[key] ?? '';
  }

  startDate = computed<Date | null>(() => {
    const raw = this.context()?.policyEffectiveDate;
    if (!raw) return null;
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  });

  endDate = computed<Date | null>(() => {
    const start = this.startDate();
    const years = this.offer()?.coverageYears ?? 0;
    if (!start || !years) return null;
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + years);
    return end;
  });

  get formGetter() { return this.form; }
  get bankName() { return this.formGetter.controls.bankName; }
  get iban() { return this.formGetter.controls.iban; }
  get email() { return this.formGetter.controls.email; }
  get phone() { return this.formGetter.controls.phoneNumber; }
  get termsConditions() { return this.formGetter.controls.termsConditions; }
  get paymentMethodId() { return this.formGetter.controls.paymentMethod; }

  createCheckout() {
    const offer = this.offer();
    if (!this.formGetter.valid || !offer) return;

    const DATA: ICreateCheckoutDTO = {
      // MMP: no motor productId - carry the deductible reference so the backend can identify the offer.
      productId: offer.deductibleReferenceNo ?? '',
      companyId: offer.insuranceCompanyId ?? 0,
      selectedBenfitCodes: [],
      totalAmount: offer.total ?? 0,
      referenceId: this.context()?.quotationReferenceNo ?? this.insuranceInquireStoreQuery.inquireResponse.refId ?? '',
      bankName: this.bankName.value,
      iban: this.iban.value,
      phoneNumber: `${this.phone.value}`,
      email: this.email.value,
      paymentMethod: this.paymentMethodId.value,
    };
    this.paymentStoreQuery.setPaymentMethod = (this.paymentMethodId.value as EPaymentsTypes);
    this.paymentStoreService.createCheckout(DATA, this.ref);
  }

  private readSession<T>(key: string): T | null {
    try {
      if (typeof sessionStorage === 'undefined') return null;
      const raw = sessionStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }
}
