export interface IInvoice {
    id: string,
    totalPrice: string,
    detailsAr:string, 
    detailsEn:string,
    invoiceDate: string,
    invoiceUrl: string,
    email: string,
}

export type TInvoiceDetailsKey = 'detailsEn' | 'detailsAr';