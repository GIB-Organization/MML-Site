import { FormControl } from "@angular/forms";

export interface IGeneralSettings{
    siteTitleAr: string,
    siteTitleEn: string,
    siteDescriptionAr: string,
    siteDescriptionEn: string,
    address:string,
    instagram: string,
    facebook:string,
    youtube:string,
    x:string,
    phone: string,
    email: string,
    showMedicalFaults:boolean,
    showMedicalInsurance:boolean,
    showCarInsurance:boolean,
}


export interface ISeoSettings{
    homeTitle: string,
    homeDescription:string,
    contactTitle:string,
    contactDescription: string,
    aboutTitle:string,
    aboutDescription: string,
    blogsTitle:string,
    blogsDescription: string,
    privacyPolicyTitle:string,
    privacyPolicyDescription: string,
    termsTitle:string,
    termsDescription: string,
}
