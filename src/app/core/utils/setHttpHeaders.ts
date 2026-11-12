import { HttpRequest } from '@angular/common/http';

/** VULN-066: adds the access token. Without a token the request is returned unchanged (never "Bearer undefined"). */
export function withAuth(req: HttpRequest<unknown>, token?: string | null): HttpRequest<unknown> {
  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

/**
 * VULN-066: defaults that do not depend on who is calling. Existing headers are never overwritten, a request without a body gets no
 * Content-Type, multipart bodies keep the boundary the browser sets, and Accept is only changed for file (blob) downloads.
 */
export function withDefaultHeaders(req: HttpRequest<unknown>): HttpRequest<unknown> {
  const headers: Record<string, string> = {};
  const hasBody = req.body !== null && req.body !== undefined;
  if (hasBody && !(req.body instanceof FormData) && !req.headers.has('Content-Type')) {
    headers['Content-Type'] = 'application/json';
  }
  if (req.responseType === 'blob' && !req.headers.has('Accept')) {
    headers['Accept'] = 'application/pdf, application/octet-stream, */*;q=0.8';
  }
  return Object.keys(headers).length ? req.clone({ setHeaders: headers }) : req;
}
