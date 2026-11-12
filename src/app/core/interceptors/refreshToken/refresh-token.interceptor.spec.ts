import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { AuthApiService } from '../../../services/api/authApi/auth-api.service';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { UnAuthorizedErrorResponse } from '../../classes/ErrorHandling';
import { BASE_URL_TOKEN } from '../../injection-tokens/base-url.token';
import { refreshTokenInterceptor } from './refresh-token.interceptor';

// VULN-068
const API = 'https://api.example.test/api/v1';
const OLD = { Authorization: 'Bearer old' };

describe('refreshTokenInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let refreshCalls: Subject<any>[];
  let session: { token: any; user: any };
  let handled: number;

  beforeEach(() => {
    refreshCalls = [];
    handled = 0;
    session = { token: { accessToken: 'old', refreshToken: 'r1' }, user: {} };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([refreshTokenInterceptor])),
        provideHttpClientTesting(),
        { provide: BASE_URL_TOKEN, useValue: API },
        { provide: AuthApiService, useValue: { refreshPath: 'refreshToken', refreshToken: () => { const s = new Subject<any>(); refreshCalls.push(s); return s; } } },
        { provide: AuthStoreQuery, useValue: { get token() { return session.token; }, get user() { return session.user; }, set setUser(u: any) { session.token = u.token; } } },
        { provide: UnAuthorizedErrorResponse, useValue: { handleErrorResponse: () => handled++ } },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  const unauthorized = () => ({ status: 401, statusText: 'Unauthorized' });
  const answerRefresh = (i = 0) => { refreshCalls[i].next({ result: { accessToken: 'new', refreshToken: 'r2' } }); refreshCalls[i].complete(); };

  it('T068-01 three parallel 401s start exactly one refresh and each request is replayed once with the new token', () => {
    const results: string[] = [];
    ['a', 'b', 'c'].forEach(p => http.get(`${API}/${p}`, { headers: OLD }).subscribe(r => results.push(r as string)));
    ['a', 'b', 'c'].forEach(p => controller.expectOne(`${API}/${p}`).flush(null, unauthorized()));

    expect(refreshCalls.length).toBe(1);
    answerRefresh();

    ['a', 'b', 'c'].forEach(p => {
      const replay = controller.expectOne(`${API}/${p}`);
      expect(replay.request.headers.get('Authorization')).toBe('Bearer new');
      replay.flush(p);
    });
    expect(results.sort()).toEqual(['a', 'b', 'c']);
  });

  it('T068-02 a failed refresh gives every caller its own 401, once', () => {
    const errors: any[] = [];
    ['a', 'b'].forEach(p => http.get(`${API}/${p}`, { headers: OLD }).subscribe({ error: e => errors.push(e) }));
    ['a', 'b'].forEach(p => controller.expectOne(`${API}/${p}`).flush(null, unauthorized()));

    refreshCalls[0].error(new HttpErrorResponse({ status: 401 }));

    expect(refreshCalls.length).toBe(1);
    expect(errors.length).toBe(2);
    errors.forEach(e => { expect(e instanceof HttpErrorResponse).toBeTrue(); expect(e.status).toBe(401); });
  });

  it('a session without a refresh token ends once and starts no refresh', () => {
    session.token = { accessToken: 'old' };
    let error: any;
    http.get(`${API}/a`, { headers: OLD }).subscribe({ error: e => error = e });
    controller.expectOne(`${API}/a`).flush(null, unauthorized());

    expect(refreshCalls.length).toBe(0);
    expect(handled).toBe(1);
    expect(error.status).toBe(401);
  });

  it('T068-03 a sign-in 401 never starts a refresh', () => {
    let error: any;
    http.post(`${API}/account/login`, {}, { headers: OLD }).subscribe({ error: e => error = e });
    controller.expectOne(`${API}/account/login`).flush(null, unauthorized());
    expect(refreshCalls.length).toBe(0);
    expect(error.status).toBe(401);
  });

  it('T068-04 a 401 on a request that had no session never starts a refresh', () => {
    http.get(`${API}/public`).subscribe({ error: () => {} });
    controller.expectOne(`${API}/public`).flush(null, unauthorized());
    expect(refreshCalls.length).toBe(0);
  });

  it('a 401 from another host never starts a refresh', () => {
    http.get('https://third-party.example/x', { headers: OLD }).subscribe({ error: () => {} });
    controller.expectOne('https://third-party.example/x').flush(null, unauthorized());
    expect(refreshCalls.length).toBe(0);
  });

  it('T068-05 a replay that gets 401 again is final and starts no second refresh', () => {
    let error: any;
    http.get(`${API}/a`, { headers: OLD }).subscribe({ error: e => error = e });
    controller.expectOne(`${API}/a`).flush(null, unauthorized());
    answerRefresh();
    controller.expectOne(`${API}/a`).flush(null, unauthorized());

    expect(refreshCalls.length).toBe(1);
    expect(error.status).toBe(401);
  });

  it('T068-06 a network failure (status 0, no url) passes through without an exception', () => {
    let error: any;
    http.get(`${API}/a`, { headers: OLD }).subscribe({ error: e => error = e });
    controller.expectOne(`${API}/a`).error(new ProgressEvent('error'));
    expect(error.status).toBe(0);
    expect(refreshCalls.length).toBe(0);
  });

  it('T068-08 a later wave of 401s after the refresh finished starts a new refresh', () => {
    http.get(`${API}/a`, { headers: OLD }).subscribe({ error: () => {} });
    controller.expectOne(`${API}/a`).flush(null, unauthorized());
    answerRefresh(0);
    controller.expectOne(`${API}/a`).flush('ok');

    http.get(`${API}/b`, { headers: { Authorization: 'Bearer new' } }).subscribe({ error: () => {} });
    controller.expectOne(`${API}/b`).flush(null, unauthorized());

    expect(refreshCalls.length).toBe(2);
    refreshCalls[1].next({ result: { accessToken: 'newer', refreshToken: 'r3' } });
    expect(controller.expectOne(`${API}/b`).request.headers.get('Authorization')).toBe('Bearer newer');
  });

  it('a request that was in flight during a refresh is replayed with the current token without a new refresh', () => {
    session.token = { accessToken: 'current', refreshToken: 'r2' };
    http.get(`${API}/a`, { headers: OLD }).subscribe();
    controller.expectOne(`${API}/a`).flush(null, unauthorized());
    expect(refreshCalls.length).toBe(0);
    expect(controller.expectOne(`${API}/a`).request.headers.get('Authorization')).toBe('Bearer current');
  });
});
