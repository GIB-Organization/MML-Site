import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShadowBoxComponentComponent } from '../shadow-box-component/shadow-box-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IChangeInfo, IChangeInfoFormGroup } from '../../../../models/auth.interface';
import { VALIDATORS } from '../../../../core/validations';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-change-main-data-component',
  standalone: true,
  imports: [ShadowBoxComponentComponent, BaseButtonComponentComponent, TranslateModule, BaseLabelComponentComponent, InputValidationAlertComponentComponent, ReactiveFormsModule],
  templateUrl: './change-main-data-component.component.html',
  styleUrl: './change-main-data-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeMainDataComponentComponent {
  authStoreService = inject(AuthStoreService);
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading());
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group<IChangeInfoFormGroup>({
    email: this.fb.nonNullable.control(this.authStoreQuery.email, [VALIDATORS['email']]),
    fullName: this.fb.nonNullable.control(this.authStoreQuery.fullName, [Validators.minLength(8)]),
    phoneNumber:this.fb.nonNullable.control(this.authStoreQuery.phoneNumber, [VALIDATORS['phone']] )
  })
  get email(){
    return this.form.controls.email;
  }
  get fullName(){
    return this.form.controls.fullName;
  }
  get phoneNumber(){
    return this.form.controls.phoneNumber;
  }
  submit(){
    this.form.valid && this.authStoreService.changeInfo(this.form.value as IChangeInfo)
  }
}
