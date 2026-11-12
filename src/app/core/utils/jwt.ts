/**
 * Reads a JWT without ever throwing (VULN-071). The browser cannot check the signature, so everything here is a convenience for the
 * screen (who is signed in, when the token ends); the server decides on every request and stays the only trust point.
 */
export interface JwtPayload {
  exp: number;
  nameid?: string;
  [claim: string]: unknown;
}

/** The payload of a well-formed token (three parts, base64url, UTF-8, a JSON object with a numeric exp), otherwise null. */
export function decodeJwt(token: unknown): JwtPayload | null {
  try {
    if (typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    base64 += '='.repeat((4 - (base64.length % 4)) % 4);
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    const valid = payload !== null && typeof payload === 'object' && !Array.isArray(payload)
      && typeof payload.exp === 'number' && Number.isFinite(payload.exp);
    return valid ? (payload as JwtPayload) : null;
  } catch {
    return null;
  }
}

/** True when the token ends within `skewSeconds` from now (a little early, so a slow clock does not send a request that is refused). */
export const isExpired = (payload: JwtPayload, skewSeconds = 30, now = Date.now()): boolean =>
  payload.exp * 1000 <= now + skewSeconds * 1000;

/** A token that is well-formed and not about to end. */
export const isUsableToken = (token: unknown, now = Date.now()): boolean => {
  const payload = decodeJwt(token);
  return !!payload && !isExpired(payload, 30, now);
};

/** Milliseconds until the token should be renewed (a minute before it ends); null when it cannot be read. */
export const msUntilRenewal = (token: unknown, now = Date.now()): number | null => {
  const payload = decodeJwt(token);
  return payload ? Math.max(0, payload.exp * 1000 - now - 60_000) : null;
};
