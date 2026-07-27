// Mirrors backend MmpQuoteResultDto / MmpOfferDto (the flat compare-offers shape returned by
// POST /quotation/quote). Keys are camelCase to match the API's camel-case JSON output.

export interface IMmpOfferPriceLine {
  typeId: number;
  amount: number;
}

export interface IMmpOfferFeature {
  id: number;
  typeId: number;
}

export interface IMmpOffer {
  insuranceCompanyId: number;
  companyKey: string;
  companyNameAr: string;
  companyNameEn: string;
  companyLogo: string;

  quotationReferenceNo: string;
  deductibleReferenceNo: string;

  coverageYears: number;
  annualCoverageLimit: number;
  singleClaimLimit: number;

  deductibleId: number;
  deductibleValue: number;
  deductibleNameAr: string;
  deductibleNameEn: string;

  basicPremium: number;
  vatPercentage: number;
  vatAmount: number;
  total: number;
  priceBreakdown: IMmpOfferPriceLine[];

  features: IMmpOfferFeature[];
}

export interface IMmpQuoteContext {
  requestReferenceNo: string;
  quotationReferenceNo: string;
  insuranceCompanyCode: number;
  policyEffectiveDate: string;
  subProfessionNameAr?: string;
  subProfessionNameEn?: string;
  experiencePeriodNameAr?: string;
  experiencePeriodNameEn?: string;
  isSurgeon?: boolean;
}

export interface IMmpQuoteResult {
  status: boolean;
  errors?: { field?: string; message?: string }[];
  quotation: IMmpQuoteContext;
  offers: IMmpOffer[];
}

// Minimal request body for POST /quotation/quote. Newtonsoft binds case-insensitively, so
// camelCase keys map onto the backend's [JsonProperty("PascalCase")] members.
export interface IMmpQuoteRequest {
  requestReferenceNo: string;
  insuranceCompanyCode: number;
  insuranceTypeID: number;
  policyHolder: {
    idTypeCode?: number;
    id?: string;
    nationalityID?: number;
    gender?: number;
  };
  quotationDetails: {
    policyEffectiveDate?: string | null;
    insuranceRiskInfo: {
      professionID?: number;
      subProfessionID?: number | null;
      isSurgeon?: boolean;
      experiencePeriod?: number;
      facilityDetails?: { practiceRegionID: number[]; facility: { typeID: number; number: number }[] };
      previousPolicyInfo?: {
        policyNumber?: string;
        insuranceCompanyCode?: number;
        retroactiveDate?: string;
        uninterruptedDuration?: number;
      } | null;
    };
  };
}
