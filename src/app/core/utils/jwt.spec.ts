import { decodeJwt, isExpired, isUsableToken, msUntilRenewal } from './jwt';
import { payloadFromToken } from './payloadfromToken';

// VULN-071
/** Builds a token the way the server does: base64url of UTF-8 JSON, no padding. */
export function makeJwt(payload: unknown, raw = false): string {
  const json = raw ? String(payload) : JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let bin = '';
  bytes.forEach(b => bin += String.fromCharCode(b));
  const body = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `eyJhbGciOiJIUzI1NiJ9.${body}.signature`;
}

describe('decodeJwt', () => {
  const inAnHour = Math.floor(Date.now() / 1000) + 3600;

  it('T071-01 reads Arabic text and base64url characters, with the padding missing', () => {
    const name = 'محمود صقر ؟؟>>';
    const token = makeJwt({ exp: inAnHour, nameid: '7', fullName: name });
    expect(token.split('.')[1]).toMatch(/[-_]|^[A-Za-z0-9]+$/);
    expect(decodeJwt(token)!['fullName']).toBe(name);
    expect(decodeJwt(token)!.nameid).toBe('7');
  });

  it('T071-02 malformed input gives null and never throws', () => {
    const bad: unknown[] = ['abc', 'a.b', 'a.!!!.c', 'a..c', '', undefined, null, 42, {}, 'a.b.c.d',
      makeJwt('not json', true), makeJwt([1, 2]), makeJwt('null', true), makeJwt({ nameid: '7' }), makeJwt({ exp: 'soon' }), makeJwt({ exp: null })];
    for (const token of bad) expect(() => decodeJwt(token)).not.toThrow();
    for (const token of bad) expect(decodeJwt(token)).withContext(String(token)).toBeNull();
  });

  it('bytes that are not UTF-8 are rejected', () => {
    const body = btoa(String.fromCharCode(0xff, 0xfe, 0xfd)).replace(/=+$/, '');
    expect(decodeJwt(`a.${body}.c`)).toBeNull();
  });

  it('T071-03 an ended token is not usable, a live one is, and the skew counts', () => {
    const now = 1_000_000_000_000;
    const at = (secondsFromNow: number) => makeJwt({ exp: now / 1000 + secondsFromNow });
    expect(isUsableToken(at(-1), now)).toBeFalse();
    expect(isUsableToken(at(10), now)).toBeFalse();
    expect(isUsableToken(at(31), now)).toBeTrue();
    expect(isUsableToken('garbage', now)).toBeFalse();
    expect(isUsableToken(undefined, now)).toBeFalse();
    expect(isExpired({ exp: now / 1000 + 5 }, 0, now)).toBeFalse();
  });

  it('T071-06 renewal is due a minute before the end, and at once when that has passed', () => {
    const now = 1_000_000_000_000;
    expect(msUntilRenewal(makeJwt({ exp: now / 1000 + 600 }), now)).toBe(540_000);
    expect(msUntilRenewal(makeJwt({ exp: now / 1000 + 30 }), now)).toBe(0);
    expect(msUntilRenewal('garbage', now)).toBeNull();
  });

  it('payloadFromToken returns an empty object instead of throwing', () => {
    expect(payloadFromToken('garbage')).toEqual({});
    expect(payloadFromToken(undefined)).toEqual({});
    expect(payloadFromToken(makeJwt({ exp: inAnHour, fullName: 'x' })).fullName).toBe('x');
  });
});
