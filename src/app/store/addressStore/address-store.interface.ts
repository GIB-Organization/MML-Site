import { ICity, ICountry, IRegion } from "../../models/address.interface";

export interface IAddressStore{
    countries: ICountry[],
    cities: ICity[],
    regions: IRegion[]
}