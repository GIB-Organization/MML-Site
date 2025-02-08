import { ShadowBoxComponentComponent } from '../../../components/views-components/profile/shadow-box-component/shadow-box-component.component';
import { DeferBlockComponentComponent } from './../../../components/shared-components/defer-block-component/defer-block-component.component';
import { EmptyDataComponentComponent } from './../../../components/shared-components/empty-data-component/empty-data-component.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cards-view',
  standalone: true,
  imports: [EmptyDataComponentComponent, DeferBlockComponentComponent, ShadowBoxComponentComponent],
  templateUrl: './cards-view.component.html',
  styleUrl: './cards-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsViewComponent {

}
