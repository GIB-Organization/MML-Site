import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);
  addSuccess(message:string = 'public.successProccess'){
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('public.success'),
      detail:  message ? this.translate.instant(message): message
    })
  }
  addError(message:string = 'public.errorProccess'){
    this.messageService.add({
      severity: 'error',
      summary:  this.translate.instant('public.error'),
      detail:  message ? this.translate.instant(message) : message
    })
  }
}
