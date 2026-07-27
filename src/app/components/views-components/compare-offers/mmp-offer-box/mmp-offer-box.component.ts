import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { BaseImageComponentComponent } from '../../../base-components/base-image-component/base-image-component.component';
import { BaseButtonComponentComponent } from '../../../base-components/base-button-component/base-button-component.component';
import { SettingsQuery } from '../../../../store/settings/settings.query';
import { LanguageService } from '../../../../services/language/language.service';
import { IMmpOffer } from '../../../../models/mmpOffer.interface';
import { ERoutes } from '../../../../core/enums';

@Component({
  selector: 'app-mmp-offer-box',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, TranslateModule, FormsModule, DropdownModule, BaseImageComponentComponent, BaseButtonComponentComponent],
  templateUrl: './mmp-offer-box.component.html',
  styleUrl: './mmp-offer-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MmpOfferBoxComponent {
  settingsQuery = inject(SettingsQuery);
  language = inject(LanguageService);
  router = inject(Router);

  // All deductible options for a single company + duration.
  offers = input.required<IMmpOffer[]>();

  selectedId = signal<number | null>(null);

  selected = computed<IMmpOffer | undefined>(() => {
    const list = this.offers();
    const id = this.selectedId();
    return list.find(o => o.deductibleId === id) ?? list[0];
  });

  get companyNameKey() { return this.language.handleBackendLocalKeys('companyName'); }
  get deductibleNameKey() { return this.language.handleBackendLocalKeys('deductibleName'); }

  deductibleLabel(offer: IMmpOffer): string {
    return (offer as any)[this.deductibleNameKey];
  }

  buy() {
    const offer = this.selected();
    if (!offer) return;
    // Carry the chosen offer to the (future) MMP order-summary redesign.
    try { sessionStorage.setItem('selectedMmpOffer', JSON.stringify(offer)); } catch { /* ignore */ }
    this.router.navigate([`${ERoutes.insuranceShow}/${ERoutes.orderSummary}`]);
  }
}
