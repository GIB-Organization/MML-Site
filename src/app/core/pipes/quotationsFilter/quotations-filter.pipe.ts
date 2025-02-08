import { Pipe, PipeTransform } from '@angular/core';
import { ICompanyQuotations } from '../../../models/quotation.interface';
import { ICompany } from '../../../models/companies.interface';
import { EQuotationsTabs, ESortingEnum } from '../../enums';

@Pipe({
  name: 'quotationsFilter',
  standalone: true
})
export class QuotationsFilterPipe implements PipeTransform {

  transform(items: ICompanyQuotations[]|undefined, company?: ICompany | null, sorting?: ESortingEnum | null, quotationType?:EQuotationsTabs|null): ICompanyQuotations[]|undefined {
    if (!items || (!company && !sorting)) {
      return items;
    }
    let filteredData = items.slice();
    // Sorting
    filteredData = filteredData.sort((a, b) => {
      const sortProperty = sorting === ESortingEnum.ascending ? a : b;
      const compareValue = sorting === ESortingEnum.descending ? b : a;

      // return (sortProperty.mappedQuotations?.[1].products[0]?.productPrice??0) - (compareValue.mappedQuotations?.[1].products[0]?.productPrice??0)
      return (sortProperty.company?.nameEn?.toLocaleLowerCase()??'') < (compareValue.company?.nameEn?.toLocaleLowerCase??'')? -1:1;
    });

    // Company filtering
    if (company) {
      filteredData = filteredData.filter(item => item?.company?.insuranceCompanyID === company.insuranceCompanyID);
    }

    // Boolean value filtering (assuming "isActive" property)
    // if (criteria.isActive !== undefined) {
    //   filteredData = filteredData.filter(item => item.isActive === criteria.isActive);
    // }

    return filteredData;
  }
}
