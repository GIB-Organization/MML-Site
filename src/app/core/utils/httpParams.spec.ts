import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { buildParams } from './httpParams';

// VULN-072
describe('buildParams', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  const urlOf = (values: Record<string, any>) => {
    http.get('/api/x', { params: buildParams(values) }).subscribe();
    const req = controller.expectOne(r => r.url === '/api/x');
    return req.request.urlWithParams;
  };

  it('T072-01 encodes every value in full', () => {
    expect(urlOf({ checkoutId: 'abc', resourcePath: '/v1/checkouts/x/payment' })).toBe('/api/x?checkoutId=abc&resourcePath=%2Fv1%2Fcheckouts%2Fx%2Fpayment');
  });

  it('T072-02 a value cannot add a parameter or cut the query short', () => {
    const url = urlOf({ checkoutId: 'a&checkoutId=evil#x' });
    expect(url).toBe('/api/x?checkoutId=a%26checkoutId%3Devil%23x');
    expect(url.split('checkoutId=').length - 1).toBe(1);
  });

  it('encodes plus, space, question mark, at and colon', () => {
    expect(urlOf({ q: 'a+b c?d@e:f' })).toBe('/api/x?q=a%2Bb%20c%3Fd%40e%3Af');
  });

  it('T072-03 null and undefined are left out, not sent as text', () => {
    expect(urlOf({ a: undefined, b: null, c: 0, d: false, e: 'x' })).toBe('/api/x?c=0&d=false&e=x');
  });

  it('keeps Arabic text readable to the server', () => {
    expect(urlOf({ slug: 'مدونة-1' })).toBe('/api/x?slug=' + encodeURIComponent('مدونة-1'));
  });
});
