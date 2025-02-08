import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InsuranceTabsComponentComponent } from '../insurance-tabs-component/insurance-tabs-component.component';
import { CarInsuranceFormComponentComponent } from '../car-insurance-form-component/car-insurance-form-component.component';

@Component({
  selector: 'app-insurances-section-component',
  standalone: true,
  imports: [InsuranceTabsComponentComponent, CarInsuranceFormComponentComponent],
  templateUrl: './insurances-section-component.component.html',
  styleUrl: './insurances-section-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsurancesSectionComponentComponent {

}
