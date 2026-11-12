import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ShadowBoxComponentComponent } from '../shadow-box-component/shadow-box-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLabelComponentComponent } from '../../../base-components/base-label-component/base-label-component.component';
import { AuthStoreService } from '../../../../store/authStore/auth-store.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IChangeInfo, IChangeInfoFormGroup } from '../../../../models/auth.interface';
import { VALIDATORS } from '../../../../core/validations';
import { InputValidationAlertComponentComponent } from '../../../shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { AuthApiService } from '../../../../services/api/authApi/auth-api.service';
import { ToasterService } from '../../../../services/toaster/toaster.service';

type Channel = 'email' | 'phone';

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
  private api = inject(AuthApiService);
  private toaster = inject(ToasterService);
  isLoading = toSignal(this.authStoreQuery.selectLoading());
  fb = inject(FormBuilder);
  // e-mail and phone are shown but not editable here: they change only through the verified flow below (VULN-015)
  form = this.fb.nonNullable.group<IChangeInfoFormGroup>({
    email: this.fb.nonNullable.control({ value: this.authStoreQuery.email, disabled: true }),
    fullName: this.fb.nonNullable.control(this.authStoreQuery.fullName, [Validators.minLength(8)]),
    phoneNumber: this.fb.nonNullable.control({ value: this.authStoreQuery.phoneNumber, disabled: true })
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

  // verified change of e-mail / phone: 1) new value + current password, 2) code sent to the new value
  channel = signal<Channel | null>(null);
  challengeId = signal<string | null>(null);
  busy = signal(false);
  change = this.fb.nonNullable.group({
    newValue: ['', [Validators.required]],
    currentPassword: ['', [Validators.required]],
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  submit(){
    // only the name is sent; the channels are omitted so the server cannot read this as a contact change
    this.fullName.valid && this.authStoreService.changeInfo({ fullName: this.fullName.value } as IChangeInfo)
  }

  startChange(channel: Channel) {
    this.change.reset({ newValue: '', currentPassword: '', code: '' });
    this.change.controls.newValue.setValidators([Validators.required, channel === 'email' ? VALIDATORS['email'] : VALIDATORS['phone']]);
    this.change.controls.newValue.updateValueAndValidity();
    this.challengeId.set(null);
    this.channel.set(channel);
  }

  cancelChange() {
    this.change.reset({ newValue: '', currentPassword: '', code: '' });
    this.challengeId.set(null);
    this.channel.set(null);
  }

  sendCode() {
    const channel = this.channel();
    const { newValue, currentPassword } = this.change.controls;
    if (!channel || newValue.invalid || currentPassword.invalid || this.busy()) return;
    this.busy.set(true);
    this.api.requestContactChange({ channel, newValue: newValue.value.trim(), currentPassword: currentPassword.value }).pipe(take(1)).subscribe({
      next: (res) => { this.busy.set(false); this.challengeId.set(res.result.challengeId); },
      error: (err) => { this.busy.set(false); this.toaster.addError(err?.error?.message); },
    });
  }

  confirmCode() {
    const channel = this.channel();
    const challengeId = this.challengeId();
    const { newValue, code } = this.change.controls;
    if (!channel || !challengeId || code.invalid || this.busy()) return;
    this.busy.set(true);
    this.api.confirmContactChange({ challengeId, channel, newValue: newValue.value.trim(), code: code.value.trim() }).pipe(take(1)).subscribe({
      next: (res) => {
        this.busy.set(false);
        // the server ended the other sessions and issued a new pair for this one
        this.authStoreQuery.setUser = res.result;
        if (channel === 'email') this.email.setValue(this.authStoreQuery.email); else this.phoneNumber.setValue(this.authStoreQuery.phoneNumber);
        this.toaster.addSuccess();
        this.cancelChange();
      },
      error: (err) => { this.busy.set(false); this.toaster.addError(err?.error?.message); },
    });
  }
}
