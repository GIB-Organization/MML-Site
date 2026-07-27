import { FormControl } from "@angular/forms";

export interface IInsuranceInquireDTO {
  idNumber: string;
  startDate: string | null;
}

export interface IInsuranceInquireFormBuilder extends ITermsConditionsAgree {
  idNumber: FormControl<string | null>;
  startDate: FormControl<string | null>;
}

export interface ITermsConditionsAgree{
  agreedTermsConditions: FormControl<boolean>
}

export interface IInsuranceInquireResponse {
  refId?: string;
  idNumber?: string;
  startDate?: string;
  firstName?: string;
  fatherName?: string;
  familyName?: string;
  grandFatherName?: string;
  firstNameT?: string;
  fatherNameT?: string;
  familyNameT?: string;
  grandFatherNameT?: string;

  // Legacy car/Yakeen-flow fields - the MMP endpoint no longer returns these. Kept optional
  // only so compare-offers/order-summary (not redesigned for MMP this phase) still compile;
  // they will read as undefined until those screens get their own MMP redesign.
  maker?: string;
  model?: string;
  modelYear?: number;
  plateNumber?: number;
  plateText1?: string;
  plateText2?: string;
  plateText3?: string;
  serialNumber?: number;
}

// Mirrors backend MmpAdditionalDataResponseDto / QuotationDetailsResponseDto (Tameeni MMP
// pricing shape). Not yet consumed by any UI this phase - stored for a future
// compare-offers redesign to read back.
export interface IMmpDeductible {
  deductibleID: number;
  policyPremium: number;
  taxableAmount: number;
  deductibleReferenceNo: string;
}
export interface IMmpCoverPlan {
  oneTimeOccurrence: number;
  aggregatedOccurrence: number;
  deductibles: IMmpDeductible[];
}
export interface IMmpQuotationDuration {
  duration: number;
  coverPlans: IMmpCoverPlan[];
}
export interface IMmpQuotationDetails {
  quotationReferenceNo?: string;
  policyEffectiveDate?: string;
  quotationDurations?: IMmpQuotationDuration[];
}
export interface IMmpAdditionalDataResponse {
  refId: string;
  pricing: IMmpQuotationDetails;
}
