import { FormArray, FormControl, FormGroup } from "@angular/forms"
import { EEstimatedDistanceEnum, EMotionVectorEnum, EPartyTypeEnum, EPromoTypeEnum } from "../core/enums"

//request body IAdditionalData
export interface IAdditionalData{
    refId?:string | null,
    estimatedValue?: number | null,
    usePurpose?: string | null ,
    getDiscount?: boolean | null,
    promoType?: EPromoTypeEnum | null,
    workMail?: string | null,
    partyType?: EPartyTypeEnum | null,
    partyId?: number | null,
    promoCode?: string | null,
    birthMonth?: number | null,
    birthYear?: number | null,
    drivers?: IDriverDetails[] | null,
    additionalDetails?: IAdditionalDetails,
    isAdditionalData?: boolean | null,
}

export interface IDriverDetails{
    idNumber?: number | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    educationLevel?: string | null,
    childrenUnder16?: number | null,
    drivingPercent?: string | null,
    driverLicenseRestrict?: string | null,
    accidents5Years?: number | null,
    relativeRelation?: string | null,
    otherViolations?: boolean | null,
    violationsTypes?: number[] | null,
    sameAddress?: boolean | null,
    residenceCityId?: number | null,
    workCityId?: number | null,
    anotherCountryLicense?: boolean | null,
    licenses?: ICountryLicencse[]
}

export interface IAdditionalDetails{
    educationLevel?: string | null,
    childrenUnder16?: number | null,
    ownerBirthDate?: number | null,
    drivingRestriction?: string | null,
    parkingPlace?: string | null ,
    accidents5Years?: number | null,
    annualDistance?: string | null,
    motionVector?: string | null,
    otherViolations?: boolean | null,
    violationTypes?: number[] | null,
    sameWorkCity?: boolean | null,
    workCityId?: number | null,
    anotherCountryLicense?: boolean | null,
    licenses?: ICountryLicencse[],
    carModified?: boolean | null,
    modifications?: string | null,
}

export interface ICountryLicencse{
    licenseCountryId?: number | null// CountriesLookup
    yearsHoldingLicense?: number | null
}


export interface IAdditionalDataFormGroup{
    estimatedValue: FormControl<number | null>,
    usePurpose: FormControl<string | null>, // UsePurposeLookupEnum
    getDiscount:  FormControl<boolean | null>,
    promoType:  FormControl<EPromoTypeEnum | null>,
    workMail:  FormControl<string | null>,
    partyType:  FormControl<EPartyTypeEnum | null>,
    partyId:  FormControl<number | null>,
    promoCode:  FormControl<string | null>,
    birthMonth:  FormControl<number | null>,
    birthYear:  FormControl<number | null>,
    drivers: FormArray<FormGroup<IDriverDetailsFormGroup>>,
    additionalDetails: FormGroup<IAdditionalDetailsFormGroup>,
    isAdditionalData:FormControl<boolean | null>,
}

export interface IDriverDetailsFormGroup{
    idNumber: FormControl<number | null>,
    birthYear: FormControl<number | null>,
    birthMonth: FormControl<number | null>,
    educationLevel: FormControl<string | null>, //EducationLevelLookupEnum
    childrenUnder16: FormControl<number | null>,
    drivingPercent: FormControl<string | null>, //DrivingPercentageLookupEnum
    driverLicenseRestrict: FormControl<string | null>, //DrivingRestrictionsLookupEnum
    accidents5Years: FormControl<number | null>,
    relativeRelation: FormControl<string | null>, //ReltiveRelationLookupEnum,
    otherViolations:  FormControl<boolean | null>,
    violationsTypes:  FormControl<number[] | null>, //ViolationTypeLookupEnum[]
    sameAddress:  FormControl<boolean | null>,
    residenceCityId:  FormControl<number | null>, //CitiesLookup
    workCityId:  FormControl<number | null>,
    anotherCountryLicense:  FormControl<boolean | null>,
    licenses: FormArray<FormGroup<ICountryLicenseFormGroup>>
}

export interface IAdditionalDetailsFormGroup{
    isOwnerDoc: FormControl<boolean | null>,
    educationLevel: FormControl<string | null>, //EducationLevelLookupEnum
    childrenUnder16: FormControl<number | null>,
    ownerBirthDate: FormControl<number | null>, // will check if date format or month and year lists
    drivingRestriction: FormControl<string | null>, //DrivingRestrictionsLookupEnum
    parkingPlace: FormControl<string | null>, //ParkingPlaceLookupEnum
    accidents5Years: FormControl<number | null>,
    annualDistance: FormControl<string | null>,
    motionVector: FormControl<string | null>,
    otherViolations: FormControl<boolean | null>,
    violationTypes: FormControl<number[] | null>, //ViolationTypeLookupEnum[]
    sameWorkCity: FormControl<boolean | null>, 
    workCityId: FormControl<number | null>, //CitiesLookup
    anotherCountryLicense: FormControl<boolean | null>,
    licenses: FormArray<FormGroup<ICountryLicenseFormGroup>>
    carModified: FormControl<boolean | null>,
    modifications: FormControl<string | null>,
}

export interface ICountryLicenseFormGroup{
    licenseCountryId:FormControl<number | null>
    yearsHoldingLicense: FormControl<number | null>
}