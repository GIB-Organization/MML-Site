import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateAdapterService extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

	fromModel(value: string): NgbDateStruct {
    const date = value?.split(this.DELIMITER);
			return {
				day: parseInt(date[2], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[0], 10),
			};
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? date.year + this.DELIMITER + this.zeroPrefix(date.month) + this.DELIMITER + this.zeroPrefix(date.day) : null;
	}

  zeroPrefix(number:number){
    return number > 9 ? number : `0${number}`
  }
}
