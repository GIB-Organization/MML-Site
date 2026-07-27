import { toSignal } from '@angular/core/rxjs-interop';
import { BaseLabelComponentComponent } from './../../../base-components/base-label-component/base-label-component.component';
import { BaseButtonComponentComponent } from './../../../base-components/base-button-component/base-button-component.component';
import { BaseCaptchaComponentComponent } from './../../../base-components/base-captcha-component/base-captcha-component.component';
import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { SidedIconComponentComponent } from '../../../shared-components/sided-icon-component/sided-icon-component.component';
import { IInsuranceInquireFormBuilder } from '../../../../models/insuranceInquire.interface';
import { InsuranceInquireStoreService } from '../../../../store/insuranceInquireStore/insurance-inquire-store.service';
import { INSURNACE_INQUIRE_VALIDATORS } from '../../../../core/validations';
import { InsuranceInquireStoreQueryService } from '../../../../store/insuranceInquireStore/insurance-inquire-store.query';
import { CustomDateAdapterService } from '../../../../services/customDateAdapter/custom-date-adapter.service';

@Component({
  selector: 'app-car-insurance-form-component',
  standalone: true,
  imports: [BaseButtonComponentComponent, TranslateModule, NgbInputDatepicker, BaseCaptchaComponentComponent, BaseLabelComponentComponent, ReactiveFormsModule, InputValidationAlertComponentComponent, SidedIconComponentComponent],
  templateUrl: './car-insurance-form-component.component.html',
  styleUrl: './car-insurance-form-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NgbDateAdapter, useClass: CustomDateAdapterService }]
})
export class CarInsuranceFormComponentComponent {
  private insuranceInquireStoreService = inject(InsuranceInquireStoreService);
  insuranceInquireStoreQuery = inject(InsuranceInquireStoreQueryService);
  datePicker = inject(NgbCalendar);
  dateAdapter = inject(NgbDateAdapter);
  fb = inject(FormBuilder);
  captchaCodeIsCorrect: WritableSignal<boolean> = signal(false);
  minDate = this.datePicker.getNext(this.datePicker.getToday());
  maxDate = this.datePicker.getNext(this.minDate, undefined, 30);
  isLoading = toSignal(this.insuranceInquireStoreQuery.selectLoading());
  insuranceForm: FormGroup = this.fb.group<IInsuranceInquireFormBuilder>({
    idNumber: this.fb.nonNullable.control(null, INSURNACE_INQUIRE_VALIDATORS['idNumber']),
    startDate: this.fb.nonNullable.control(this.dateAdapter.toModel(this.minDate), INSURNACE_INQUIRE_VALIDATORS['required']),
    agreedTermsConditions: this.fb.nonNullable.control(false, [Validators.requiredTrue])
  })

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
