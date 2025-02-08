import { IDefaultLookupsCategories, ILookupCategories } from "../../models/lookup.interface";

export interface ILookupStore{
  lookups: ILookupCategories,
  defaultLookups: IDefaultLookupsCategories
};