/**
 * Request checks for the server-side rendering server (VULN-070).
 *
 * The page URL handed to the renderer used to be built from whatever `Host` header the request carried, which lets a caller steer
 * server-side requests and generated absolute URLs. The renderer is now only given a host from an allowlist.
 */

export interface HostPolicy {
  /** Lower-case host names without port. */
  readonly allowed: ReadonlySet<string>;
  /** False means no public host was configured: the check only warns (see `describeHostPolicy`). */
  readonly enforced: boolean;
}

/** Names the server may be reached by on the machine itself: health checks and a proxy that does not forward the original Host. */
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];

/** "gib.sa, www.gib.sa" -> ["gib.sa", "www.gib.sa"]. Anything that is not a plain host name is dropped. */
export function parseHosts(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter((h) => /^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/.test(h));
}

/**
 * @param configured the `SSR_ALLOWED_HOSTS` setting (comma separated), which replaces the defaults when present
 * @param defaults hosts known from the build (may be empty)
 */
export function buildHostPolicy(configured: string | undefined, defaults: string[]): HostPolicy {
  const fromConfig = parseHosts(configured);
  const publicHosts = fromConfig.length > 0 ? fromConfig : defaults.map((h) => h.toLowerCase());
  return {
    allowed: new Set([...LOCAL_HOSTS, ...publicHosts]),
    enforced: publicHosts.length > 0,
  };
}

/**
 * The host name (no port) of a Host header, lower-cased, or null when the header is missing, repeated, or not a plain host.
 * Repeated headers arrive joined or as an array; both are refused.
 */
export function normaliseHost(header: string | string[] | undefined): string | null {
  if (typeof header !== 'string') return null;
  const value = header.trim().toLowerCase();
  if (value.length === 0 || value.length > 255) return null;

  const match = /^(\[[0-9a-f:.]+\]|[a-z0-9]([a-z0-9.-]*[a-z0-9])?)(:\d{1,5})?$/.exec(value);
  return match ? match[1] : null;
}

export function isHostAllowed(policy: HostPolicy, header: string | string[] | undefined): boolean {
  const host = normaliseHost(header);
  if (host === null) return false;
  return !policy.enforced || policy.allowed.has(host);
}

/** One line for the start-up log. */
export function describeHostPolicy(policy: HostPolicy): string {
  return policy.enforced
    ? `Host header restricted to: ${[...policy.allowed].join(', ')}`
    : 'WARNING: SSR_ALLOWED_HOSTS is not set, so any Host header is accepted. Set it to the public host names of this site.';
}

/** Response headers that are safe for every page. (A Content-Security-Policy needs the page inventory and is a separate step.) */
export const securityHeaders: Readonly<Record<string, string>> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
};

/** `TRUST_PROXY_HOPS=1` for one reverse proxy in front. Unset or invalid: the proxy headers are not trusted. */
export function parseTrustProxyHops(value: string | undefined): number | null {
  if (value === undefined || !/^\d{1,2}$/.test(value.trim())) return null;
  const hops = Number(value.trim());
  return hops > 0 ? hops : null;
}

interface RequestLike { headers: { host?: string | string[] } }
interface ResponseLike {
  setHeader(name: string, value: string): unknown;
  status(code: number): { type(contentType: string): { send(body: string): unknown } };
}

/**
 * Express middleware: sets the fixed security headers on every response and refuses a request whose Host header is not allowed
 * before anything is rendered or served.
 */
export function securityMiddleware(policy: HostPolicy) {
  return (req: RequestLike, res: ResponseLike, next: () => void): void => {
    for (const [name, value] of Object.entries(securityHeaders)) res.setHeader(name, value);

    if (!isHostAllowed(policy, req.headers.host)) {
      res.status(400).type('text/plain').send('Bad Request');
      return;
    }
    next();
  };
}
