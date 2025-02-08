export interface ICountry {
    countryId: number;
    nameAr: string;
    nameEn: string;
    mappingCode: string;
}
export interface IRegion {
    regionId: number;
    nameAr: string;
    nameEn: string;
}
export interface ICity {
    cityId: number;
    nameAr: string;
    nameEn: string;
    mappingCode: string;
    regionId: number;
}

export type TAddressNameKey = 'nameAr' | 'nameEn';