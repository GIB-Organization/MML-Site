import { Inject, Injectable, Injector, inject } from '@angular/core';
import { IslamicDateService } from '../islamicDate/islamic-date.service';
import { IDateService } from '../../models/date.interface';
import { GregorianDateService } from '../gregorianDate/gregorian-date.service';

@Injectable({
  providedIn: 'root'
})
export class DateFactoryService {
  injector = inject(Injector)
  createDateLists(idNumber: number): IDateService {
    const FIRST_DIGIT = +String(idNumber).charAt(0)
    switch (FIRST_DIGIT) {
      case 1:
        return this.injector.get(IslamicDateService)
      case 2:
        return this.injector.get(GregorianDateService)
      default:
        return this.injector.get(GregorianDateService)
    }
  }
}
