import { EQuotationsTabs, EQuotationType } from "../enums/quotations.enum";

interface IQuotationStartegy{
    quotationType:EQuotationType,
}
class ThirdPartyClass implements IQuotationStartegy{
    quotationType: EQuotationType = EQuotationType.thirdParty;
}
class ComprehensiveAgencyClass implements IQuotationStartegy{
    quotationType: EQuotationType = EQuotationType.comprehensiveAgency;
}
class ComprehensiveWorkshopClass implements IQuotationStartegy{
    quotationType: EQuotationType = EQuotationType.comprehensiveWorkshop;
}

export class QuotationStartegyClass{
    quotationType!: EQuotationType;

    chooseQuotationType(type:EQuotationsTabs, isAgency:boolean){
        if(type === EQuotationsTabs.thirdParty){
            this.quotationType = new ThirdPartyClass().quotationType;
        }
        else if((type === EQuotationsTabs.comprehensive) && (isAgency == true)){
            this.quotationType = new ComprehensiveAgencyClass().quotationType;
        }
        else if((type === EQuotationsTabs.comprehensive) && (isAgency == false)){
            this.quotationType = new ComprehensiveWorkshopClass().quotationType;
        }
        return this.quotationType;
    }
}