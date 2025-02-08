import { ETicketStatus } from './../../../core/enums/ticket.enum';
import { TicketsStoreQuery } from './../../../store/ticketsStore/tickets-store.query';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DeferBlockComponentComponent } from '../../../components/shared-components/defer-block-component/defer-block-component.component';
import { EmptyDataComponentComponent } from '../../../components/shared-components/empty-data-component/empty-data-component.component';
import { ShadowBoxComponentComponent } from '../../../components/views-components/profile/shadow-box-component/shadow-box-component.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { DialogComponentComponent } from '../../../components/shared-components/dialog-component/dialog-component.component';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { BaseLabelComponentComponent } from '../../../components/base-components/base-label-component/base-label-component.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { TicketsStoreService } from '../../../store/ticketsStore/tickets-store.service';
import { LoadingContentComponentComponent } from '../../../components/shared-components/loading-content-component/loading-content-component.component';
import { ITicket, ITicketCreate, ITicketCreateFormGroup } from '../../../models/ticket.interface';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseImageComponentComponent } from '../../../components/base-components/base-image-component/base-image-component.component';
import { InputValidationAlertComponentComponent } from '../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-support-tickets-view',
  standalone: true,
  imports: [DeferBlockComponentComponent, EmptyDataComponentComponent, ShadowBoxComponentComponent, TranslateModule, BaseButtonComponentComponent, DialogComponentComponent, FileUploadModule, BaseLabelComponentComponent, LoadingContentComponentComponent, ReactiveFormsModule, BaseImageComponentComponent, InputValidationAlertComponentComponent],
  templateUrl: './support-tickets-view.component.html',
  styleUrl: './support-tickets-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportTicketsViewComponent implements OnInit{
  newTicketDialog: boolean = false;
  ref = inject(DestroyRef);
  fb = inject(FormBuilder);
  ticketsStoreQuery = inject(TicketsStoreQuery);
  ticketsStoreService = inject(TicketsStoreService);
  isLoading = toSignal<boolean>(this.ticketsStoreQuery.selectLoading());
  isCreatingTicket = toSignal<boolean>(this.ticketsStoreQuery.isCreatingTicket$);
  tickets = toSignal<ITicket[]>(this.ticketsStoreQuery.tickets$);
  title = inject(Title);
  translate = inject(TranslateService);

  createForm = this.fb.group<ITicketCreateFormGroup>({
    subject: this.fb.nonNullable.control('', [Validators.required]),
    details: this.fb.nonNullable.control('', [Validators.required]),
    file: this.fb.nonNullable.control(null),
  })

  get form(){
    return this.createForm
  }
  get subject(){
    return this.form.controls.subject
  }
  get details(){
    return this.form.controls.details
  }
  get file(){
    return this.form.controls.file
  }

  get ETicketStatus(){
    return ETicketStatus
  }

  ngOnInit(): void {
    this.title.setTitle(this.translate.instant('views.profile.supportTicket.title'))
    this.ticketsStoreService.getAllTickets(this.ref);
  }

  setFile($event:FileSelectEvent){
    this.file.setValue($event.currentFiles[0])
  }

  sendForm(){
    this.form.valid && this.ticketsStoreService.createTicket(this.form.value as ITicketCreate, this.ref, ()=>{
      this.newTicketDialog = false;
      this.form.reset()
    });
  }
}
