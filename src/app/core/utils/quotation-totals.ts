import { IBenefit, IPriceDetail, IQuotationProduct } from '../../models/quotation.interface';
import { EPriceDetailCode } from '../enums/quotations.enum';

/** Money is kept to whole halalas: 33.33 three times is 99.99, never 99.99000000000001 (VULN-074). */
export const round2 = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;

/** A benefit with no price is part of the product and cannot be chosen or removed. */
export const isDefaultBenefit = (benefit: IBenefit): boolean => benefit.benefitPrice === 0;

/**
 * The price the customer sees for a product plus the optional benefits they chose, worked out from the product as the insurer
 * returned it and the whole selection, never by adding and taking away deltas on an already changed price (VULN-074).
 * The VAT line (if the product has one) grows by the VAT on the chosen benefits; a product without a VAT line still gets the VAT in its total.
 */
export function computeQuoteTotals(
  base: Partial<IQuotationProduct>,
  selected: readonly IBenefit[],
  vatPercent: number
): { productPrice: number; priceDetails: IPriceDetail[] } {
  const extraNet = selected.reduce((sum, benefit) => sum + benefit.benefitPrice, 0);
  const extraVat = round2((extraNet * vatPercent) / 100);
  const details = base.priceDetails ?? [];
  const vatIndex = details.findIndex(detail => detail.priceTypeCode === EPriceDetailCode.vat);
  const priceDetails = details.map((detail, index) =>
    index === vatIndex ? { ...detail, priceValue: round2(detail.priceValue + extraVat) } : { ...detail }
  );
  return { productPrice: round2((base.productPrice ?? 0) + extraNet + extraVat), priceDetails };
}
