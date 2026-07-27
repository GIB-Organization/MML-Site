import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { filter, take } from 'rxjs';
import { TitleBoxComponentComponent } from '../../../components/views-components/compare-offers/title-box-component/title-box-component.component';
import { MmpOfferBoxComponent } from '../../../components/views-components/compare-offers/mmp-offer-box/mmp-offer-box.component';
import { QuotationApiService } from '../../../services/api/quotationApi/quotation-api.service';
import { CompaniesStoreService } from '../../../store/companiesStore/companies-store.service';
import { CompaniesStoreQuery } from '../../../store/companiesStore/companies-store.query';
import { InsuranceInquireStoreQueryService } from '../../../store/insuranceInquireStore/insurance-inquire-store.query';
import { AdditionalDataFormService } from '../../../services/additionalDataForm/additional-data-form.service';
import { ICompany } from '../../../models/companies.interface';
import { IMmpOffer, IMmpQuoteContext, IMmpQuoteRequest } from '../../../models/mmpOffer.interface';

@Component({
  selector: 'app-compare-offers',
  standalone: true,
  imports: [TitleBoxComponentComponent, TranslateModule, MmpOfferBoxComponent],
  templateUrl: './compare-offers.component.html',
  styleUrl: './compare-offers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareOffersComponent implements OnInit {
  private api = inject(QuotationApiService);
  private companiesStoreService = inject(CompaniesStoreService);
  private companiesStoreQuery = inject(CompaniesStoreQuery);
  private inquireQuery = inject(InsuranceInquireStoreQueryService);
  private additionalDataForm = inject(AdditionalDataFormService);

  loading = signal(true);
  hasError = signal(false);
  offers = signal<IMmpOffer[]>([]);
  context = signal<IMmpQuoteContext | null>(null);

  // One card per company + coverage duration; the deductible options become the card's dropdown.
  offerGroups = computed<IMmpOffer[][]>(() => {
    const groups = new Map<string, IMmpOffer[]>();
    for (const offer of this.offers()) {
      const key = `${offer.insuranceCompanyId}-${offer.coverageYears}`;
      const list = groups.get(key) ?? [];
      list.push(offer);
      groups.set(key, list);
    }
    return Array.from(groups.values());
  });

  ngOnInit(): void {
    this.companiesStoreService.getCompanies();
    this.companiesStoreQuery.select('companies').pipe(
      filter((companies): companies is ICompany[] => Array.isArray(companies) && companies.length > 0),
      take(1),
    ).subscribe(companies => this.loadOffers(companies));
  }

  private loadOffers(companies: ICompany[]): void {
    const company = companies.find(c => (c.key ?? '').toLowerCase() === 'tameeni') ?? companies[0];
    const companyId = company.insuranceCompanyID ?? 0;

    this.api.getMmpQuote(companyId, this.buildRequest(companyId)).pipe(take(1)).subscribe({
      next: res => {
        this.offers.set(res?.offers ?? []);
        this.context.set(res?.quotation ?? null);
        // Carry the quotation context to the order-summary (insured specialty, references).
        try { sessionStorage.setItem('mmpQuoteContext', JSON.stringify(res?.quotation ?? null)); } catch { /* ignore */ }
        this.loading.set(false);
      },
      error: () => { this.hasError.set(true); this.loading.set(false); },
    });
  }

  private buildRequest(companyId: number): IMmpQuoteRequest {
    const form = this.additionalDataForm.form.value;
    const inquire = this.inquireQuery.inquireResponse;

    return {
      requestReferenceNo: this.newGuid(),
      insuranceCompanyCode: companyId,
      insuranceTypeID: 1,
      policyHolder: { id: inquire?.idNumber },
      quotationDetails: {
        policyEffectiveDate: inquire?.startDate ?? null,
        insuranceRiskInfo: {
          subProfessionID: form.subProfessionId ?? null,
          isSurgeon: false,
          experiencePeriod: form.experiencePeriodId ?? 0,
          facilityDetails: { practiceRegionID: [], facility: [{ typeID: 1, number: 1 }] },
          previousPolicyInfo: form.hasPreviousInsurance
            ? {
                policyNumber: form.previousPolicyNumber ?? undefined,
                retroactiveDate: form.retroactiveDate ?? undefined,
              }
            : null,
        },
      },
    };
  }

  private newGuid(): string {
    const c: any = typeof crypto !== 'undefined' ? crypto : undefined;
    if (c?.randomUUID) return c.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ch => {
      const r = (Math.random() * 16) | 0;
      const v = ch === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
