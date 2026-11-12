import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { InvoiceStore } from '../../../store/invoiceStore/invoice-store.store';
import { SessionLifecycleService } from '../../../services/core/session/session-lifecycle.service';
import { sessionInterceptor } from './session.interceptor';

// VULN-067
describe('sessionInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let session: SessionLifecycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(withInterceptors([sessionInterceptor])), provideHttpClientTesting()] });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    session = TestBed.inject(SessionLifecycleService);
  });

  it('T067-03 a response that arrives after logout is never delivered', () => {
    const store = TestBed.inject(InvoiceStore);
    http.get('/api/invoices', { headers: { Authorization: 'Bearer t' } }).subscribe(() => store.update({ __probe: 'late' } as any));
    const pending = controller.expectOne('/api/invoices');

    session.endSession();

    expect(pending.cancelled).toBeTrue();
    expect((store.getValue() as any).__probe).toBeUndefined();
  });

  it('requests without a token are not cancelled', () => {
    http.get('/assets/i18n/en.json').subscribe();
    const pending = controller.expectOne('/assets/i18n/en.json');
    session.endSession();
    expect(pending.cancelled).toBeFalse();
  });

  it('T067-07 the sign-out call itself is not cancelled', () => {
    http.post('/api/v1/account/logout', {}, { headers: { Authorization: 'Bearer t' } }).subscribe();
    const pending = controller.expectOne('/api/v1/account/logout');
    session.endSession();
    expect(pending.cancelled).toBeFalse();
  });
});
