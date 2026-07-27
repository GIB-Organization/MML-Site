import { DateFactoryService } from './../../../../services/dateFactory/date-factory.service';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ELookupCategory } from '../../../../core/enums/lookups.enum';
import { LookupsStoreQuery } from '../../../../store/lookupsStore/lookups-store.query';
import { AdditionalDataFormService } from '../../../../services/additionalDataForm/additional-data-form.service';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InsuranceInquireStoreQueryService } from '../../../../store/insuranceInquireStore/insurance-inquire-store.query';
import { ConstantsService } from '../../../../services/core/constants/constants.service';
import { CompaniesStoreQuery } from '../../../../store/companiesStore/companies-store.query';
import { CompaniesStoreService } from '../../../../store/companiesStore/companies-store.service';
import { CustomDateAdapterService } from '../../../../services/customDateAdapter/custom-date-adapter.service';

@Component({
  selector: 'app-specializationform-componenet',
  standalone: true,
  imports: [BaseLabelComponentComponent, BaseButtonComponentComponent, InputNumberModule, DropdownModule, TranslateModule, ReactiveFormsModule, InputValidationAlertComponentComponent, NgbInputDatepicker],
  templateUrl: './specializationform-componenet.component.html',
  styleUrl: './specializationform-componenet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NgbDateAdapter, useClass: CustomDateAdapterService }]
})
export class SpecializationformComponenetComponent {
  constants = inject(ConstantsService);
  lookupsStoreQuery = inject(LookupsStoreQuery);
  dateFactoryService = inject(DateFactoryService)
  additionalDataFormService = inject(AdditionalDataFormService);
  insuranceInquireStoreQuery = inject(InsuranceInquireStoreQueryService);
  companiesStoreQuery = inject(CompaniesStoreQuery);
  companiesStoreService = inject(CompaniesStoreService);
  destroyRef = inject(DestroyRef);

  get ELookupCategory() {
    return ELookupCategory
  }

  get applicantDateLists() {
    return this.dateFactoryService.createDateLists(Number(this.insuranceInquireStoreQuery.inquireResponse?.idNumber) || 1)
  }

  ngOnInit(): void {
    this.companiesStoreService.getCompanies();
    this.lookupsStoreQuery.defaultLookups$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.additionalDataFormService.subProfessionId.setValue(res[ELookupCategory.SubProfessions]?.referenceId ?? null)
        this.additionalDataFormService.experiencePeriodId.setValue(res[ELookupCategory.ExperiencePeriods]?.referenceId ?? null)
      }
    })
  }
}
