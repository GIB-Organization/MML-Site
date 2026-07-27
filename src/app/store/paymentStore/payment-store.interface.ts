import { EPaymentStatus, EPaymentsTypes } from "../../core/enums";
import { ICreateCheckoutDTO } from "../../models/checkout.interface";

export interface IPaymentStore{
    checkoutId?: string,
    checkoutStatus?:EPaymentStatus,
    paymentMethod?:EPaymentsTypes,
    data?: ICreateCheckoutDTO
}