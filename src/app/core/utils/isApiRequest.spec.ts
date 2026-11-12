import { isApiRequest, isAuthFree } from './isApiRequest';

// VULN-066
describe('isApiRequest', () => {
  const base = 'https://gib-backend.com.sa/api/v1';

  it('accepts addresses inside the API path on the same origin', () => {
    expect(isApiRequest(base + '/x', base)).toBeTrue();
    expect(isApiRequest(base, base)).toBeTrue();
    expect(isApiRequest(base + '/x?a=1', base + '/')).toBeTrue();
  });

  it('rejects other hosts, ports, schemes and paths', () => {
    expect(isApiRequest('https://gib-backend.com.sa.evil.com/api/v1/x', base)).toBeFalse();
    expect(isApiRequest('https://gib-backend.com.sa:8443/api/v1/x', base)).toBeFalse();
    expect(isApiRequest('http://gib-backend.com.sa/api/v1/x', base)).toBeFalse();
    expect(isApiRequest('https://gib-backend.com.sa/api/v10/x', base)).toBeFalse();
    expect(isApiRequest('https://x.example/?u=' + base, base)).toBeFalse();
    expect(isApiRequest('javascript:alert(1)', base)).toBeFalse();
  });

  it('rejects everything when no API address is configured', () => {
    expect(isApiRequest(base + '/x', undefined, '')).toBeFalse();
  });

  it('knows the public sign-in routes', () => {
    expect(isAuthFree(base + '/account/refreshToken')).toBeTrue();
    expect(isAuthFree(base + '/account/profile')).toBeFalse();
  });
});
