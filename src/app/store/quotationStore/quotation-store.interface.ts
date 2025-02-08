import { ICompanyQuotations, ISelectedQuotation } from "../../models/quotation.interface"

export interface IQuotationStore{
  quotations:ICompanyQuotations[],
  selectedQuotationData?: ISelectedQuotation,
}
