import { EPaymentStatus, EPaymentsTypes } from "../../core/enums";

export interface IPaymentStore{
    checkoutId?: string,
    checkoutStatus?:EPaymentStatus,
    paymentMethod?:EPaymentsTypes,
}