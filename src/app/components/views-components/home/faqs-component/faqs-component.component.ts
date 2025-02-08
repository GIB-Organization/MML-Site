import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { UnderlineTitleComponentComponent } from '../../../layout-components/underline-title-component/underline-title-component.component';
import { AccordionModule } from 'primeng/accordion';
import { IFaq } from '../../../../models/faq.interface';
import { WebsiteStoreQuery } from '../../../../store/websiteStore/website-store.query';

@Component({
  selector: 'app-faqs-component',
  standalone: true,
  imports: [TranslateModule, AccordionModule, UnderlineTitleComponentComponent],
  templateUrl: './faqs-component.component.html',
  styleUrl: './faqs-component.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqsComponentComponent{
  websiteStoreQuery = inject(WebsiteStoreQuery);
  faqs = input<IFaq[]>([])
}
