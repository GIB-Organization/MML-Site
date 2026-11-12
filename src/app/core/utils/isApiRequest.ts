// VULN-066: decides whether a request goes to our own API, so the access token is never sent anywhere else.

/** Public routes that never need (and must not receive) the access token; compared with the end of the path, in lower case. */
export const AUTH_FREE_PATHS: readonly string[] = ['account/login', 'account/register', 'account/sendloginotp', 'account/sendregisterotp', 'account/sendforgotpasswordotp', 'account/resetpassword', 'account/refreshtoken'];

function parse(url: string): URL | null {
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
    return new URL(url, origin);
  } catch {
    return null;
  }
}

/** True only when the origin is exactly the API's and the path is inside the API's path (not a look-alike host, not a URL inside a query string). */
export function isApiRequest(url: string, ...apiBases: (string | null | undefined)[]): boolean {
  const target = parse(url);
  if (!target || (target.protocol !== 'https:' && target.protocol !== 'http:')) return false;
  return apiBases.some(base => {
    const api = base ? parse(base) : null;
    if (!api || api.origin !== target.origin) return false;
    const prefix = api.pathname.replace(/\/+$/, '');
    return target.pathname === prefix || target.pathname.startsWith(prefix + '/');
  });
}

export function isAuthFree(url: string): boolean {
  const target = parse(url);
  if (!target) return false;
  const path = target.pathname.toLowerCase().replace(/\/+$/, '');
  return AUTH_FREE_PATHS.some(p => path.endsWith('/' + p));
}
