import { IInvoice } from "../../models/invoice.interface";

export interface IInvoiceStore{
  invoices: IInvoice[],
}