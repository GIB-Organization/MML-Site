import { TestBed } from '@angular/core/testing';
import { Store, __stores__ } from '@datorama/akita';
import { AddressStore } from '../../../store/addressStore/address-store.store';
import { AuthStore } from '../../../store/authStore/auth-store.store';
import { CompaniesStore } from '../../../store/companiesStore/companies-store.store';
import { InsuranceInquireStoreStoreService } from '../../../store/insuranceInquireStore/insurance-inquire-store.store';
import { InvoiceStore } from '../../../store/invoiceStore/invoice-store.store';
import { LookupsStore } from '../../../store/lookupsStore/lookups-store.store';
import { PaymentStore } from '../../../store/paymentStore/payment-store.store';
import { PoliciesStore } from '../../../store/policiesStore/policies-store.store';
import { QuotationStore } from '../../../store/quotationStore/quotation-store.store';
import { SettingsStore } from '../../../store/settings/settings.store';
import { TicketsStore } from '../../../store/ticketsStore/tickets-store.store';
import { WebsiteStore } from '../../../store/websiteStore/website-store.store';
import { PUBLIC_STORE_NAMES, SessionLifecycleService } from './session-lifecycle.service';

// VULN-067
describe('SessionLifecycleService', () => {
  let session: SessionLifecycleService;
  let all: Store<any>[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    session = TestBed.inject(SessionLifecycleService);
    all = [AuthStore, InvoiceStore, PoliciesStore, TicketsStore, QuotationStore, InsuranceInquireStoreStoreService, PaymentStore,
      AddressStore, CompaniesStore, LookupsStore, SettingsStore, WebsiteStore].map(s => TestBed.inject(s as any) as Store<any>);
  });

  const probe = (s: Store<any>) => (s.getValue() as any).__probe;

  it('T067-01 every private store goes back to its initial state', () => {
    all.forEach(s => s.update({ __probe: 'private data' } as any));
    session.endSession();
    all.filter(s => !PUBLIC_STORE_NAMES.includes(s.storeName)).forEach(s => expect(probe(s)).withContext(s.storeName).toBeUndefined());
  });

  it('keeps the public reference stores', () => {
    all.forEach(s => s.update({ __probe: 'x' } as any));
    session.endSession();
    all.filter(s => PUBLIC_STORE_NAMES.includes(s.storeName)).forEach(s => expect(probe(s)).withContext(s.storeName).toBe('x'));
  });

  it('T067-08 every store that is not public can be reset', () => {
    Object.values(__stores__)
      .filter(s => !PUBLIC_STORE_NAMES.includes(s.storeName))
      .forEach(s => expect(() => s.reset()).withContext(s.storeName).not.toThrow());
  });

  it('counts sessions and tells in-flight work that the session ended', () => {
    let ended = 0;
    session.ended$.subscribe(() => ended++);
    const before = session.epoch();
    session.endSession();
    expect(session.epoch()).toBe(before + 1);
    expect(ended).toBe(1);
  });
});
