import { HttpParameterCodec, HttpParams } from '@angular/common/http';

/**
 * VULN-072: every value that goes into a query string is encoded in full. Angular's default codec leaves characters such as
 * "+", "=", "&" unchanged in some positions, so a value taken from the address bar could add a parameter or cut the query short.
 */
export class StrictParamsCodec implements HttpParameterCodec {
  encodeKey(key: string): string { return encodeURIComponent(key); }
  encodeValue(value: string): string { return encodeURIComponent(value); }
  decodeKey(key: string): string { return decodeURIComponent(key); }
  decodeValue(value: string): string { return decodeURIComponent(value); }
}

/** Builds the query of a request from named values. null and undefined are left out (never sent as the text "undefined"). */
export function buildParams(values: Record<string, string | number | boolean | null | undefined>): HttpParams {
  return Object.entries(values).reduce(
    (params, [key, value]) => (value === null || value === undefined ? params : params.set(key, String(value))),
    new HttpParams({ encoder: new StrictParamsCodec() })
  );
}
