import { AdditionalDataFormService } from './../../../../services/additionalDataForm/additional-data-form.service';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { LookupsStoreQuery } from '../../../../store/lookupsStore/lookups-store.query';
import { ELookupCategory } from '../../../../core/enums/lookups.enum';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddressStoreQuery } from '../../../../store/addressStore/address-store.query';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { ConstantsService } from '../../../../services/core/constants/constants.service';

@Component({
  selector: 'app-owner-form-component',
  standalone: true,
  imports: [BaseLabelComponentComponent, BaseButtonComponentComponent, InputSwitchModule, DropdownModule, TranslateModule, UpperCasePipe, MultiSelectModule, ReactiveFormsModule, InputValidationAlertComponentComponent],
  templateUrl: './owner-form-component.component.html',
  styleUrl: './owner-form-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnerFormComponentComponent {
  constants = inject(ConstantsService);
  lookupsStoreQuery = inject(LookupsStoreQuery);
  addressStoreQuery = inject(AddressStoreQuery);
  additionalDataFormService = inject(AdditionalDataFormService);
  form = this.additionalDataFormService.form;
  destroyRef = inject(DestroyRef)
  isOwnerDoc = new FormControl()
  get ELookupCategory(){
    return ELookupCategory
  }
  get FIVE_YEARS_ACCIDENTS(){
    return this.constants.fiveYearsAccidentsList
  }
  get CHILDREN_UNDER_16(){
    return this.constants.chidrenUnder16List
  }
  get YEARS_HOLDING_LICENSE(){
    return this.constants.yearsHoldingLicenseList
  }

  ngOnInit(): void {
    this.lookupsStoreQuery.defaultLookups$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.additionalDataFormService.defaultFormValue.additionalDetails = {
          ...this.additionalDataFormService.defaultFormValue.additionalDetails,
          educationLevel: res[ELookupCategory.educations]?.mappingCode,
          drivingRestriction: res[ELookupCategory.medicalConditions]?.mappingCode,
          parkingPlace: res[ELookupCategory.parkingLocations]?.mappingCode,
          annualDistance: res[ELookupCategory.mileages]?.mappingCode,
          motionVector: res[ELookupCategory.transmissionTypes]?.mappingCode,
          ...this.additionalDataFormService.form.value.additionalDetails
        }
        this.additionalDataFormService.additionalDetails.patchValue(this.additionalDataFormService.defaultFormValue.additionalDetails)
      }
    })
  }

  openCloseSection(){
    this.additionalDataFormService.isAdditionalData.setValue(!this.additionalDataFormService.isAdditionalData.value);
    this.additionalDataFormService.additionalDetails.reset(this.additionalDataFormService.defaultFormValue.additionalDetails)
  }
}
