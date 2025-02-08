import { FormControl } from "@angular/forms";
import { EInsurancePurpose, EVehicleRegisterType } from "../core/enums/insurance-inquire";

export interface IInsuranceInquireDTO {
  idNumber: number;
  startDate: string | null;
}

export interface IInsuranceInquireFormBuilder extends ITermsConditionsAgree {
  idNumber: FormControl<number | null>;
  startDate: FormControl<string | null>;
}

export interface ITermsConditionsAgree{
  agreedTermsConditions: FormControl<boolean>
}

export interface IInsuranceInquireResponse {
  refId?:string,
  firstName?: string;
  fatherName?: string;
  familyName?: string;
  grandFatherName?: string;
  firstNameT?: string;
  fatherNameT?: string;
  familyNameT?: string;
  grandFatherNameT?: string;
  maker?: string;
  model?: string;
  modelYear?: number;
  majorColor?: string;
  weight?: number;
  cylinder?: number;
  capacity?: number;
  vehicleIDNumber?: null;
  registrationLocationCode?: null;
  regTypeCode?: null;
  registrationExpiryDate?: null;
  plateNumber?: null;
  plateText1?: null;
  plateText2?: null;
  plateText3?: null;
  idNumber?: number;
  serialNumber?: number;
  vehicleInfo?: any[];
}