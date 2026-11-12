import { IBenefit, IPriceDetail } from '../../models/quotation.interface';
import { EPriceDetailCode } from '../enums/quotations.enum';
import { computeQuoteTotals, round2 } from './quotation-totals';

// VULN-074
describe('computeQuoteTotals', () => {
  const benefit = (id: string, price: number): IBenefit => ({ benefitId: id, benefitCode: 1, benefitPrice: price } as IBenefit);
  const detail = (code: number, value: number): IPriceDetail => ({ priceTypeCode: code, priceValue: value, percentageValue: 0 });
  const product = (details: IPriceDetail[], price = 1000) => ({ productPrice: price, priceDetails: details });

  it('T074-01 adds the benefit and its VAT to the price and to the VAT line', () => {
    const result = computeQuoteTotals(product([detail(EPriceDetailCode.basicPremium, 870), detail(EPriceDetailCode.vat, 130)]), [benefit('a', 100)], 15);
    expect(result.productPrice).toBe(1115);
    expect(result.priceDetails[1].priceValue).toBe(145);
    expect(result.priceDetails[0].priceValue).toBe(870);
  });

  it('T074-01 an empty selection leaves the product unchanged', () => {
    const base = product([detail(EPriceDetailCode.vat, 130)]);
    const result = computeQuoteTotals(base, [], 15);
    expect(result.productPrice).toBe(1000);
    expect(result.priceDetails).toEqual(base.priceDetails);
  });

  it('T074-02 a VAT line in first position is updated', () => {
    const result = computeQuoteTotals(product([detail(EPriceDetailCode.vat, 130), detail(EPriceDetailCode.basicPremium, 870)]), [benefit('a', 100)], 15);
    expect(result.priceDetails[0].priceValue).toBe(145);
  });

  it('T074-02 a product without a VAT line does not throw and still counts the VAT in the total', () => {
    expect(() => computeQuoteTotals(product([detail(EPriceDetailCode.basicPremium, 1000)]), [benefit('a', 100)], 15)).not.toThrow();
    expect(computeQuoteTotals(product([detail(EPriceDetailCode.basicPremium, 1000)]), [benefit('a', 100)], 15).productPrice).toBe(1115);
    expect(computeQuoteTotals({ productPrice: 50 }, [benefit('a', 10)], 15).productPrice).toBe(61.5);
  });

  it('T074-05 three benefits of 33.33 are rounded to two decimals', () => {
    const three = [benefit('a', 33.33), benefit('b', 33.33), benefit('c', 33.33)];
    const result = computeQuoteTotals(product([detail(EPriceDetailCode.vat, 0)], 0), three, 15);
    expect(result.productPrice).toBe(114.99);
    expect(result.priceDetails[0].priceValue).toBe(15);
    expect(round2(0.1 + 0.2)).toBe(0.3);
  });

  it('does not change the product it was given', () => {
    const base = product([detail(EPriceDetailCode.vat, 130)]);
    computeQuoteTotals(base, [benefit('a', 100)], 15);
    expect(base.productPrice).toBe(1000);
    expect(base.priceDetails[0].priceValue).toBe(130);
  });
});
