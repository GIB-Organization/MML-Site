import { EQuotationsTabs, ESortingEnum } from "../core/enums";
import { EQuotationType } from "../core/enums/quotations.enum";
import { ICompany } from "./companies.interface";

export interface IQuotation{
  referenceId: string;
  quotationNo: string;
  productTypeCode: number;
  vehicleAgencyRepair:boolean;
  quotationDate: string;
  quotationExpiryDate: string;
  products: IQuotationProduct[];
}

export interface IQuotationProduct {
  productId: string;
  productNameAr: string;
  productNameEn: string;
  productDescAr: string;
  productDescEn: string;
  productPrice: number;
  deductibleValue: number;
  vehicleLimitValue: number;
  priceDetails: IPriceDetail[];
  benefits: IBenefit[];
  proposalForms: IProposalForm[];
}

interface IProposalForm {
  proposalFormDataTypeCode: number;
  proposalFormId: string;
  proposalFormNameAr: string;
  proposalFormNameEn: string;
  proposalFormMandatory: boolean;
}

export interface IBenefit {
  benefitCode: number;
  benefitId: string;
  benefitNameAr: string;
  benefitNameEn: string;
  benefitDescAr: string;
  benefitDescEn: string;
  benefitPrice: number;
}

export interface IPriceDetail {
  priceTypeCode: number;
  priceValue: number;
  percentageValue: number;
}

export type IMappedQuotations = {
  [key in EQuotationType | number] : IQuotation
}

export interface ICompanyQuotations{
  quotations?: IQuotation[],
  mappedQuotations?: IMappedQuotations,
  company?: ICompany
}


export interface IQuotationsFilter{
  company: ICompany|null,
  isAgency: boolean,
  sorting:ESortingEnum|null,
  type:EQuotationsTabs,
}

export interface ISelectedQuotation{
  quotation: IQuotation,
  choosedProduct: IQuotationProduct,
  choosedBenefits: IBenefit[],
  company: Partial<ICompany>
}

export type TProductNameKey = 'productNameAr'|'productNameEn';
export type TProductDescKey = 'productDescAr'|'productDescEn';
export type TBenefitNameKey = 'benefitNameAr'|'benefitNameEn';