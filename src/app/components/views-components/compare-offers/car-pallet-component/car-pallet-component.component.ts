import { BaseImageComponentComponent } from './../../../base-components/base-image-component/base-image-component.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-car-pallet-component',
  standalone: true,
  imports: [BaseImageComponentComponent],
  templateUrl: './car-pallet-component.component.html',
  styleUrl: './car-pallet-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarPalletComponentComponent {
  plateNumber = input.required<number>()
  carCharsAr = input.required<string>()
  // carCharsAr:string = `${this.insuranceInquireStoreQuery.inquireResponse.plateText1} ${this.insuranceInquireStoreQuery.inquireResponse.plateText2} ${this.insuranceInquireStoreQuery.inquireResponse.plateText3}`;
}
