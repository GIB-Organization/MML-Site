import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDialogService } from '../../../../services/auth/auth-dialog.service';
import { AuthStoreQuery } from '../../../../store/authStore/auth-store.query';
import { CompaniesStoreQuery } from '../../../../store/companiesStore/companies-store.query';
import { QuotationStoreQuery } from '../../../../store/quotationStore/quotation-store.query';
import { SettingsQuery } from '../../../../store/settings/settings.query';
import { EPriceDetailCode } from '../../../../core/enums/quotations.enum';
import { IBenefit, IQuotation, IQuotationProduct } from '../../../../models/quotation.interface';
import { QuotationBoxComponent } from './quotation-box.component';

// VULN-074
describe('QuotationBoxComponent benefits', () => {
  const benefit = (id: string, code: number, price: number) => ({ benefitId: id, benefitCode: code, benefitPrice: price } as IBenefit);
  const A = benefit('a', 1, 100), B = benefit('b', 2, 200), C = benefit('c', 3, 300), FREE = benefit('free', 4, 0);
  const product = (id: string): Partial<IQuotationProduct> => ({
    productId: id, productPrice: 1000,
    priceDetails: [{ priceTypeCode: EPriceDetailCode.vat, priceValue: 130, percentageValue: 15 }, { priceTypeCode: EPriceDetailCode.basicPremium, priceValue: 870, percentageValue: 0 }],
    benefits: [A, B, C, FREE],
  });
  const tick = (checked: boolean) => ({ target: { checked } } as unknown as Event);

  let stored: any;
  function create(initial: Partial<IQuotationProduct>) {
    stored = undefined;
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: ActivatedRoute, useValue: {} },
        { provide: SettingsQuery, useValue: {} },
        { provide: CompaniesStoreQuery, useValue: {} },
        { provide: AuthDialogService, useValue: {} },
        { provide: AuthStoreQuery, useValue: { isAuthenticated: true } },
        { provide: QuotationStoreQuery, useValue: { setSelectedQuotationData: (d: any) => stored = d } },
      ],
    });
    TestBed.overrideComponent(QuotationBoxComponent, { set: { template: '', imports: [] } });
    const fixture = TestBed.createComponent(QuotationBoxComponent);
    fixture.componentRef.setInput('choosedProduct', initial);
    fixture.componentRef.setInput('quotation', { errors: [] } as unknown as IQuotation);
    fixture.componentRef.setInput('company', {});
    fixture.detectChanges();
    return fixture.componentInstance;
  }
  const ids = (component: QuotationBoxComponent) => component.choosedBenefits.map(b => b.benefitId);

  it('T074-03 unticking A after A, B, C removes exactly A and its price', () => {
    const box = create(product('p1'));
    box.toggleBenefit(A, tick(true)); box.toggleBenefit(B, tick(true)); box.toggleBenefit(C, tick(true));
    box.toggleBenefit(A, tick(false));

    expect(ids(box)).toEqual(['b', 'c']);
    expect(box.choosedProduct().productPrice).toBe(1000 + 500 + 75);
    expect(box.choosedProduct().priceDetails![0].priceValue).toBe(130 + 75);
    expect(box.selectedIds().has('a')).toBeFalse();
  });

  it('ticking and unticking everything returns to the original price', () => {
    const box = create(product('p1'));
    [A, B, C].forEach(b => box.toggleBenefit(b, tick(true)));
    [C, A, B].forEach(b => box.toggleBenefit(b, tick(false)));
    expect(ids(box)).toEqual([]);
    expect(box.choosedProduct().productPrice).toBe(1000);
    expect(box.choosedProduct().priceDetails![0].priceValue).toBe(130);
  });

  it('T074-04 unticking something that is not ticked changes nothing and does not throw', () => {
    const box = create(product('p1'));
    box.toggleBenefit(B, tick(true));
    expect(() => box.toggleBenefit(A, tick(false))).not.toThrow();
    expect(() => box.toggleBenefit(A, tick(false))).not.toThrow();
    expect(ids(box)).toEqual(['b']);
    expect(box.choosedProduct().productPrice).toBe(1230);
  });

  it('a default (free) benefit cannot be chosen or removed', () => {
    const box = create(product('p1'));
    box.toggleBenefit(FREE, tick(true));
    expect(ids(box)).toEqual([]);
    expect(box.choosedProduct().productPrice).toBe(1000);
  });

  it('a benefit that belongs to another product is ignored', () => {
    const box = create(product('p1'));
    box.toggleBenefit(benefit('other', 9, 50), tick(true));
    expect(ids(box)).toEqual([]);
    expect(box.choosedProduct().productPrice).toBe(1000);
  });

  it('T074-06 choosing another product starts with nothing ticked', () => {
    const box = create(product('p1'));
    box.toggleBenefit(A, tick(true));
    box.changeProduct(product('p2') as IQuotationProduct);
    expect(ids(box)).toEqual([]);
    expect(box.selectedIds().size).toBe(0);
    expect(box.choosedProduct().productPrice).toBe(1000);
    box.toggleBenefit(B, tick(true));
    expect(box.choosedProduct().productPrice).toBe(1230);
    expect(box.choosedProduct().productId).toBe('p2');
  });

  it('a product handed in from outside (for example another tab) starts a fresh selection', () => {
    const box = create(product('p1'));
    box.toggleBenefit(A, tick(true));
    box.choosedProduct.set(product('p3'));
    expect(ids(box)).toEqual([]);
    expect(box.selectedIds().size).toBe(0);
    box.toggleBenefit(C, tick(true));
    expect(box.choosedProduct().productPrice).toBe(1345);
  });

  it('T074-07 submit stores the same selection and the price that was shown', () => {
    const box = create(product('p1'));
    box.toggleBenefit(B, tick(true)); box.toggleBenefit(C, tick(true)); box.toggleBenefit(B, tick(false));
    box.submit();
    expect(stored.choosedBenefits.map((b: IBenefit) => b.benefitCode)).toEqual([3]);
    expect(stored.choosedProduct.productPrice).toBe(1345);
  });
});
