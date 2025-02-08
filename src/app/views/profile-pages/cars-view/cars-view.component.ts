import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DeferBlockComponentComponent } from '../../../components/shared-components/defer-block-component/defer-block-component.component';
import { EmptyDataComponentComponent } from '../../../components/shared-components/empty-data-component/empty-data-component.component';
import { ShadowBoxComponentComponent } from '../../../components/views-components/profile/shadow-box-component/shadow-box-component.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { BaseImageComponentComponent } from '../../../components/base-components/base-image-component/base-image-component.component';
import { CarPalletComponentComponent } from '../../../components/views-components/compare-offers/car-pallet-component/car-pallet-component.component';
import { CarStoreQuery } from '../../../store/carStore/car-store.query';
import { CarStoreService } from '../../../store/carStore/car-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cars-view',
  standalone: true,
  imports: [DeferBlockComponentComponent, EmptyDataComponentComponent, ShadowBoxComponentComponent, InputNumberModule, TranslateModule, BaseButtonComponentComponent, BaseImageComponentComponent, CarPalletComponentComponent],
  templateUrl: './cars-view.component.html',
  styleUrl: './cars-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsViewComponent implements OnInit {
  ref = inject(DestroyRef)
  carsStoreQuery = inject(CarStoreQuery)
  carsStoreService = inject(CarStoreService)
  isDeleting = toSignal(this.carsStoreQuery.isDeleting$);
  cars = toSignal(this.carsStoreQuery.cars$);
  title = inject(Title);
  translate = inject(TranslateService);

  ngOnInit(): void {
    this.title.setTitle(this.translate.instant('views.profile.cars.title'))
    this.carsStoreService.getAllCars(this.ref);
  }
}
