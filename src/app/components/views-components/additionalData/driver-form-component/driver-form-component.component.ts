import { ChangeDetectionStrategy, Component, OnInit, inject, DestroyRef } from '@angular/core';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { BaseAlertComponentComponent } from '../../../base-components/base-alert-component/base-alert-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { UpperCasePipe } from '@angular/common';
import { ELookupCategory } from '../../../../core/enums/lookups.enum';
import { LookupsStoreQuery } from '../../../../store/lookupsStore/lookups-store.query';
import { DateFactoryService } from '../../../../services/dateFactory/date-factory.service';
import { AddressStoreQuery } from '../../../../store/addressStore/address-store.query';
import { AdditionalDataFormService } from '../../../../services/additionalDataForm/additional-data-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { ConstantsService } from '../../../../services/core/constants/constants.service';

@Component({
  selector: 'app-driver-form-component',
  standalone: true,
  imports: [BaseLabelComponentComponent, BaseAlertComponentComponent, BaseButtonComponentComponent, TranslateModule, DropdownModule, InputNumberModule, UpperCasePipe, ReactiveFormsModule, MultiSelectModule, InputValidationAlertComponentComponent],
  templateUrl: './driver-form-component.component.html',
  styleUrl: './driver-form-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverFormComponentComponent implements OnInit {
  constants = inject(ConstantsService)
  destroyRef = inject(DestroyRef)
  lookupsStoreQuery = inject(LookupsStoreQuery)
  dateFactoryService = inject(DateFactoryService)
  addressStoreQuery = inject(AddressStoreQuery)
  additionalDataFormService = inject(AdditionalDataFormService);
  form = this.additionalDataFormService.form;
  get ELookupCategory() {
    return ELookupCategory
  }
  get FIVE_YEARS_ACCIDENTS() {
    return this.constants.fiveYearsAccidentsList
  }
  get CHILDREN_UNDER_16() {
    return this.constants.chidrenUnder16List
  }
  get YEARS_HOLDING_LICENSE() {
    return this.constants.yearsHoldingLicenseList
  }
  get YES_NO() {
    return this.constants.yesNoList
  }
  

  ngOnInit(): void {
    this.lookupsStoreQuery.defaultLookups$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.additionalDataFormService.driverDefaultValue = {
          ...this.additionalDataFormService.driverDefaultValue,
          educationLevel: res[ELookupCategory.educations]?.mappingCode,
          driverLicenseRestrict: res[ELookupCategory.medicalConditions]?.mappingCode,
          drivingPercent: res[ELookupCategory.drivingPercentages]?.mappingCode,
          relativeRelation: res[ELookupCategory.relationships]?.mappingCode,
        }
      }
    })
  } 
}
