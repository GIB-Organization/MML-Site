import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policiesFilter',
  standalone: true
})
export class PoliciesFilterPipe implements PipeTransform {

  transform(items: any[], searchTerms: { [key: string]: any } = {}): any[] {
    if (!items || !searchTerms) {
      return [];
    }

    return items.filter(item => {
      for (const key in searchTerms) {
        if (searchTerms.hasOwnProperty(key)) {
          const searchValue = searchTerms[key];
          const itemValue = item[key];

          if (searchValue !== undefined && itemValue !== undefined) {
            if (typeof itemValue === 'string') {
              // Case-insensitive string comparison
              if (!itemValue.toLowerCase().includes(searchValue.toLowerCase())) {
                return false;
              }
            } else if (typeof itemValue === 'number') {
              // Number comparison
              if (itemValue !== searchValue) {
                return false;
              }
            } else if (Array.isArray(itemValue)) {
              // Array search (e.g., for tags)
              if (!itemValue.includes(searchValue)) {
                return false;
              }
            } else {
              // Other data types (handle as needed)
              if (itemValue !== searchValue) {
                return false;
              }
            }
          }
        }
      }
      return true;
    });
  }
}
