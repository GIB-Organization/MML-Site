import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { BASE_URL_TOKEN } from '../../injection-tokens/base-url.token';
import { authInterceptor } from './auth.interceptor';

// VULN-066
const API = 'https://api.example.test/api/v1';

describe('authInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let session: { token?: { accessToken: string } };

  function setup(platform: 'browser' | 'server' = 'browser') {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthStoreQuery, useValue: { get token() { return session.token; } } },
        { provide: BASE_URL_TOKEN, useValue: API },
        { provide: PLATFORM_ID, useValue: platform },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  }

  beforeEach(() => { session = { token: { accessToken: 'tok' } }; });
  afterEach(() => controller.verify());

  function sent(url: string, method: 'get' | 'post' = 'get', body: unknown = null, options: object = {}) {
    (method === 'get' ? http.get(url, options) : http.post(url, body, options)).subscribe();
    return controller.expectOne(url);
  }

  it('T066-01 no token: no Authorization header at all', () => {
    session = {}; setup();
    expect(sent(`${API}/x`).request.headers.has('Authorization')).toBeFalse();
  });

  it('T066-02 token and API address: Bearer token', () => {
    setup();
    expect(sent(`${API}/x`).request.headers.get('Authorization')).toBe('Bearer tok');
  });

  it('T066-03 another host never receives the token', () => {
    setup();
    expect(sent('https://third-party.example/x').request.headers.has('Authorization')).toBeFalse();
  });

  it('T066-04 look-alike hosts and URLs inside a query string never receive the token', () => {
    setup();
    expect(sent('https://api.example.test.evil.com/api/v1/x').request.headers.has('Authorization')).toBeFalse();
    expect(sent('https://evil.example/x?u=https://api.example.test/api/v1/x').request.headers.has('Authorization')).toBeFalse();
    expect(sent('https://api.example.test/other/x').request.headers.has('Authorization')).toBeFalse();
    expect(sent('http://api.example.test/api/v1/x').request.headers.has('Authorization')).toBeFalse();
  });

  it('T066-05 public sign-in routes carry no token', () => {
    setup();
    expect(sent(`${API}/account/login`, 'post', {}).request.headers.has('Authorization')).toBeFalse();
    expect(sent(`${API}/account/refreshToken`, 'post', {}).request.headers.has('Authorization')).toBeFalse();
    expect(sent(`${API}/account/profile`, 'post', {}).request.headers.get('Authorization')).toBe('Bearer tok');
  });

  it('T066-06 JSON body gets application/json, multipart and bodiless calls do not', () => {
    setup();
    expect(sent(`${API}/x`, 'post', { a: 1 }).request.headers.get('Content-Type')).toBe('application/json');
    const form = new FormData(); form.append('f', 'v');
    expect(sent(`${API}/y`, 'post', form).request.headers.has('Content-Type')).toBeFalse();
    const get = sent(`${API}/z`).request;
    expect(get.headers.has('Content-Type')).toBeFalse();
    expect(get.headers.has('Accept')).toBeFalse();
  });

  it('T066-06 only a file download asks for a PDF, and an explicit Accept is kept', () => {
    setup();
    expect(sent(`${API}/a`, 'get', null, { responseType: 'blob' }).request.headers.get('Accept')).toContain('application/pdf');
    expect(sent(`${API}/b`, 'get', null, { responseType: 'blob', headers: { Accept: 'image/png' } }).request.headers.get('Accept')).toBe('image/png');
  });

  it('T066-07 server-side rendering never adds the token', () => {
    setup('server');
    expect(sent(`${API}/x`).request.headers.has('Authorization')).toBeFalse();
  });
});
