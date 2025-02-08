export interface ICompany {
    insuranceCompanyID?: number;
    grade?: number;
    key?: string;
    order?: number;
    nameAr?: string;
    nameEn?: string;
    descAr?: string;
    descEn?: string;
    isActiveTPL?: boolean;
    isActiveComprehensive?: boolean;
    activeTabbySanadPlus?: boolean;
    activeTabbyWafiSmart?: boolean;
    activeTabbyTpl?: boolean;
    activeTabbyComp?: boolean;
    appPoolName?: string;
    email?: string;
    fax?: string;
    homePhone?: string;
    mobileNumber?: string;
    webSite?: null;
    addressEn?: string;
    addressAr?: string;
  }

  export type TCompanyNameKey = 'nameAr'|'nameEn';
  export type TCompanyDescKey = 'descAr'|'descEn';