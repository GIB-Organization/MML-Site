import { Injectable } from '@angular/core';
import { ESortingEnum } from '../../core/enums';

@Injectable()
export class SortingService {
  sortingList:{name:string, key:ESortingEnum}[]=[
    { name:  'sortingEnum.asc', key: ESortingEnum.ascending},
    { name:  'sortingEnum.des', key: ESortingEnum.descending},
  ]
}
