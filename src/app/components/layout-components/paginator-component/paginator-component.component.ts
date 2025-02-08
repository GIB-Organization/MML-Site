import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { Pagination } from '../../../core/classes/Pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-paginator-component',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './paginator-component.component.html',
  styleUrl: './paginator-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponentComponent {
  pagination = model(new Pagination());
  totalRecords = input<number>(0)

  pageChanged(page:number){
    this.pagination.set({...this.pagination(), page: page});
  }
}
