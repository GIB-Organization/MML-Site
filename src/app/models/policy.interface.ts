import { EPolicyNajmStatus, EPolicyStatus } from "../core/enums";

export interface IPolicy{
    policyId: string,
    companyName: string,
    policyStatus: EPolicyStatus,  
    policyStartDate: string,
    policyEndDate: string,
    najmStatus: EPolicyNajmStatus, 
    carPlateChars: string,
    carPlateNumber: number,
    carModel: string,
    carBrand: string,
    carYear:string,
    policyLeftDays: string,
    policyFileUrl: string,
    idNumber: string,
    sequenceNumber:string,
}