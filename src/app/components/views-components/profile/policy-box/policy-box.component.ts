import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarPalletComponentComponent } from '../../compare-offers/car-pallet-component/car-pallet-component.component';
import { BaseButtonComponentComponent } from "../../../base-components/base-button-component/base-button-component.component";
import { IPolicy } from '../../../../models/policy.interface';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PoliciesStoreService } from '../../../../store/policiesStore/policies-store.service';
import { PoliciesStoreQuery } from '../../../../store/policiesStore/policies-store.query';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-policy-box',
  standalone: true,
  imports: [TranslateModule, CarPalletComponentComponent, BaseButtonComponentComponent, DecimalPipe, DatePipe],
  templateUrl: './policy-box.component.html',
  styleUrl: './policy-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyBoxComponent {
  ref = inject(DestroyRef);
  policy = input.required<IPolicy>();
  // MMP (medical malpractice) policies have no vehicle, so the plate/car details are null.
  hasCar = computed(()=> !!this.policy().carPlateChars);
  carPlateChars = computed(()=> {
    const chars = this.policy().carPlateChars;
    return chars ? `${chars[0]} ${chars[1]} ${chars[2]}` : '';
  });
  policiesStoreService = inject(PoliciesStoreService)
  policiesStoreQuery = inject(PoliciesStoreQuery)
  isLoading = toSignal(this.policiesStoreQuery.fileIsLoading$)
  cardBrand = computed(()=>{
    return `${this.policy().carBrand} ${this.policy().carModel} ${this.policy().carYear}`
  })
}
