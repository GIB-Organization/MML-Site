import { ELookupCategory } from "../core/enums/lookups.enum";

export interface ILookup {
  lookupId: number;
  referenceId: number;
  orderNo: number;
  nameAr: string;
  nameEn: string;
  mappingCode: string;
  categoryId: number;
  lookupCategory: ELookupCategory;
  isDefult?: boolean;
}
export type ILookupCategories = {
  [key in ELookupCategory | number] : ILookup[]
}
export type IDefaultLookupsCategories = {
  [key in ELookupCategory | number] : ILookup
}

export type TLookupNameKey = 'nameAr' | 'nameEn';