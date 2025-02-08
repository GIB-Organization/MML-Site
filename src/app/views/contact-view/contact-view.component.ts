import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../components/base-components/base-button-component/base-button-component.component';
import { SettingsQuery } from '../../store/settings/settings.query';
import { BaseLinkComponentComponent } from '../../components/base-components/base-link-component/base-link-component.component';
import { BaseLabelComponentComponent } from '../../components/base-components/base-label-component/base-label-component.component';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IContactUs, IContactUsFormGroup } from '../../models/contactUs.interface';
import { VALIDATORS } from '../../core/validations';
import { InputValidationAlertComponentComponent } from '../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { WebsiteStoreService } from '../../store/websiteStore/website-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { WebsiteStoreQuery } from '../../store/websiteStore/website-store.query';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent, BaseLinkComponentComponent, BaseLabelComponentComponent, InputValidationAlertComponentComponent, ReactiveFormsModule],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent implements OnInit{
  settingsQuery = inject(SettingsQuery);
  websiteStoreService = inject(WebsiteStoreService);
  websiteStoreQuery = inject(WebsiteStoreQuery);
  title = inject(Title);
  translateService = inject(TranslateService);
  isContacting = toSignal(this.websiteStoreQuery.isContacting$);
  meta = inject(Meta);
  fb = inject(FormBuilder);
  form = this.fb.group<IContactUsFormGroup>({
    email: this.fb.nonNullable.control('', [VALIDATORS['email'], Validators.required]),
    phone: this.fb.nonNullable.control('', [VALIDATORS['phone'], Validators.required]),
    message: this.fb.nonNullable.control('', [Validators.required]),
    fullName: this.fb.nonNullable.control('', [Validators.required]),
    subject: this.fb.nonNullable.control('', [Validators.required]),
  })

  get email(){
    return this.form.controls.email
  }
  get phone(){
    return this.form.controls.phone
  }
  get message(){
    return this.form.controls.message
  }
  get fullName(){
    return this.form.controls.fullName
  }
  get subject(){
    return this.form.controls.subject
  }

  ngOnInit(): void {
    this.title.setTitle(this.settingsQuery.seoSettings?.contactTitle??'')
    this.meta.updateTag({ name: 'description', content: this.settingsQuery.seoSettings?.contactDescription??'' });
  }

  submit(){
    this.form.valid && this.websiteStoreService.contactUs(this.form.value as IContactUs, ()=>{
      this.form.reset()
    })
  }

}
