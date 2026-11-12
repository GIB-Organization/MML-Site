// VULN-065: the one place that decides whether a server-supplied address may be put in an href.
// Only these schemes are allowed; anything else (javascript:, data:, vbscript:, blob:, file: ...) gives null and the link is not rendered.
const ALLOWED_PROTOCOLS = new Set(['https:', 'http:', 'mailto:', 'tel:']);

export function toSafeExternalUrl(raw: string | null | undefined, base?: string): string | null {
  if (!raw) return null;
  const text = raw.trim();
  if (!text) return null;
  try {
    const origin = base ?? (typeof window !== 'undefined' ? window.location.origin : 'https://localhost');
    const url = new URL(text, origin);
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) return null;
    // mailto: and tel: are returned as typed, because URL#toString would re-encode them
    return url.protocol === 'mailto:' || url.protocol === 'tel:' ? text : url.toString();
  } catch {
    return null;
  }
}
