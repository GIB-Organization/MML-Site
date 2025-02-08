import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BaseLabelComponentComponent } from './../../../base-components/base-label-component/base-label-component.component';
import { BaseButtonComponentComponent } from './../../../base-components/base-button-component/base-button-component.component';
import { BaseCaptchaComponentComponent } from './../../../base-components/base-captcha-component/base-captcha-component.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { IFormStructure } from '../../../../models/layout-models/radio.interface';
import { EPopover } from '../../../../core/enums/popover.enum';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EInsurancePurpose, EVehicleRegisterType } from '../../../../core/enums';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { IInsuranceInquireFormBuilder } from '../../../../models/insuranceInquire.interface';
import { DropdownModule } from 'primeng/dropdown';
import { InsuranceInquireStoreService } from '../../../../store/insuranceInquireStore/insurance-inquire-store.service';
import { INSURNACE_INQUIRE_VALIDATORS } from '../../../../core/validations';
import { InsuranceInquireStoreQueryService } from '../../../../store/insuranceInquireStore/insurance-inquire-store.query';
import { CustomDateAdapterService } from '../../../../services/customDateAdapter/custom-date-adapter.service';
import { DateFactoryService } from '../../../../services/dateFactory/date-factory.service';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-car-insurance-form-component',
  standalone: true,
  imports: [BaseButtonComponentComponent, TranslateModule, NgbInputDatepicker, BaseCaptchaComponentComponent, BaseLabelComponentComponent, InputNumberModule, AutoCompleteModule, ReactiveFormsModule, InputValidationAlertComponentComponent, DropdownModule, FloatLabelModule],
  templateUrl: './car-insurance-form-component.component.html',
  styleUrl: './car-insurance-form-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NgbDateAdapter, useClass: CustomDateAdapterService }]
})

export class CarInsuranceFormComponentComponent implements OnInit {
  private insuranceInquireStoreService = inject(InsuranceInquireStoreService);
  insuranceInquireStoreQuery = inject(InsuranceInquireStoreQueryService);
  dateFactoryService = inject(DateFactoryService)
  #destroyRef = inject(DestroyRef);
  datePicker = inject(NgbCalendar);
  dateAdapter = inject(NgbDateAdapter);
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef)
  captchaCodeIsCorrect: WritableSignal<boolean> = signal(false);
  minDate = this.datePicker.getNext(this.datePicker.getToday());
  maxDate = this.datePicker.getNext(this.minDate,undefined, 30);
  isLoading = toSignal(this.insuranceInquireStoreQuery.selectLoading());
  insuranceForm: FormGroup = this.fb.group<IInsuranceInquireFormBuilder>({
    idNumber: this.fb.nonNullable.control(null, INSURNACE_INQUIRE_VALIDATORS['idNumber']),
    startDate: this.fb.nonNullable.control(this.dateAdapter.toModel(this.minDate), INSURNACE_INQUIRE_VALIDATORS['required']),
    agreedTermsConditions: this.fb.nonNullable.control(false, [Validators.requiredTrue])
  })
  get EPopover() {
    return EPopover
  }
  get EInsurancePurpose() {
    return EInsurancePurpose
  }
  get EVehicleRegisterType() {
    return EVehicleRegisterType
  }

  ngOnInit(): void {
  }

  vehicleYearValidator() {
    const VEHICLE_TYPE = this.getControl('vehicleRegisterType');
    const vehicleYear = this.getControl('vehicleYear');
    const VALIDATIONS = (VEHICLE_TYPE?.value === EVehicleRegisterType.customcards) ? INSURNACE_INQUIRE_VALIDATORS['required'] : null;
    vehicleYear?.setValidators(VALIDATIONS);
    vehicleYear?.updateValueAndValidity()
  }
  serialNumberValidator() {
    const VEHICLE_TYPE = this.getControl('vehicleRegisterType');
    const SERIAL_NUMBER = this.getControl('serialNumber');
    const VALIDATIONS = (VEHICLE_TYPE?.value !== EVehicleRegisterType.customcards ? INSURNACE_INQUIRE_VALIDATORS['serialNumber'] : null)
    SERIAL_NUMBER?.setValidators(VALIDATIONS);
    SERIAL_NUMBER?.updateValueAndValidity()
  }
  sellerIdValidator() {
    const PURPOSE = this.getControl('purpose');
    const BUYER_ID = this.getControl('sellerId');
    const VALIDATIONS = (PURPOSE?.value === EInsurancePurpose.ownershipTransfer ? INSURNACE_INQUIRE_VALIDATORS['idNumber'] : null)
    BUYER_ID?.setValidators(VALIDATIONS);
    BUYER_ID?.updateValueAndValidity()
  }
  updateInputsValidations() {
    this.vehicleYearValidator()
    this.serialNumberValidator()
    this.sellerIdValidator()
  }

  controlNotValid(controlName: string) {
    const CONTROL = this.insuranceForm?.controls[controlName]
    return (CONTROL.invalid && CONTROL.touched)
  }
  getControl(controlName: string) {
    return this.insuranceForm?.get(controlName);
  }
  submit() {
    this.insuranceInquireStoreService.inquireInsurance(this.insuranceForm.value);
  }
}