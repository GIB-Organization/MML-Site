import { AddressStoreService } from './../../../store/addressStore/address-store.service';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseAlertComponentComponent } from '../../../components/base-components/base-alert-component/base-alert-component.component';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { DividerModule } from 'primeng/divider';
import { LookupsStoreService } from '../../../store/lookupsStore/lookups-store.service';
import { ELookupCategory } from '../../../core/enums/lookups.enum';
import { DiscountFormComponentComponent } from '../../../components/views-components/additionalData/discount-form-component/discount-form-component.component';
import { DriverFormComponentComponent } from '../../../components/views-components/additionalData/driver-form-component/driver-form-component.component';
import { OwnerFormComponentComponent } from '../../../components/views-components/additionalData/owner-form-component/owner-form-component.component';
import { UpperCasePipe } from '@angular/common';
import { InsuranceInquireStoreService } from '../../../store/insuranceInquireStore/insurance-inquire-store.service';
import { AdditionalDataFormService } from '../../../services/additionalDataForm/additional-data-form.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { InsuranceInquireStoreQueryService } from '../../../store/insuranceInquireStore/insurance-inquire-store.query';
import { BaseLinkComponentComponent } from '../../../components/base-components/base-link-component/base-link-component.component';

@Component({
  selector: 'app-additional-data-view',
  standalone: true,
  imports: [TranslateModule, BaseAlertComponentComponent, BaseButtonComponentComponent, BaseLinkComponentComponent, DividerModule, DiscountFormComponentComponent, DriverFormComponentComponent, OwnerFormComponentComponent, UpperCasePipe ],
  templateUrl: './additional-data-view.component.html',
  styleUrl: './additional-data-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalDataViewComponent implements OnInit {
  private lookupsStoreService = inject(LookupsStoreService);
  private addressStoreService = inject(AddressStoreService);
  public insuranceInquireStoreService = inject(InsuranceInquireStoreService)
  public insuranceInquireStoreQueryService = inject(InsuranceInquireStoreQueryService)
  public additionalDataFormService = inject(AdditionalDataFormService)
  public isLoading = toSignal(this.insuranceInquireStoreQueryService.selectLoading());
  requiredLookups:ELookupCategory[] = [
    ELookupCategory.drivingPercentages,
    ELookupCategory.educations,
    ELookupCategory.medicalConditions,
    ELookupCategory.mileages,
    ELookupCategory.parkingLocations,
    ELookupCategory.relationships,
    ELookupCategory.transmissionTypes,
    ELookupCategory.vehicleUses,
    ELookupCategory.violations,
  ]
 

  ngOnInit(): void {
    this.lookupsStoreService.getLookupsByCategoriesIds(this.requiredLookups);
    this.addressStoreService.getCountries();
    this.addressStoreService.getCities();
  }
}
