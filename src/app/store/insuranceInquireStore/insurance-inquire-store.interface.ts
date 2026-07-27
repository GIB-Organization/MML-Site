import { IInsuranceInquireResponse, IMmpQuotationDetails } from "../../models/insuranceInquire.interface";

export interface IInsuranceInquireStore{
    inquireResponse: IInsuranceInquireResponse,
    pricing?: IMmpQuotationDetails,
}
