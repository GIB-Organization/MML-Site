import { toSafeExternalUrl } from './safeUrl';

// VULN-065
describe('toSafeExternalUrl', () => {
  it('T065-01 rejects script-capable and unknown schemes', () => {
    expect(toSafeExternalUrl('javascript:alert(1)')).toBeNull();
    expect(toSafeExternalUrl('  JaVaScRiPt:alert(1)')).toBeNull();
    expect(toSafeExternalUrl('java\tscript:alert(1)')).toBeNull();
    expect(toSafeExternalUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
    expect(toSafeExternalUrl('vbscript:msgbox(1)')).toBeNull();
    expect(toSafeExternalUrl('blob:https://a.example/x')).toBeNull();
    expect(toSafeExternalUrl('file:///c:/windows/win.ini')).toBeNull();
    expect(toSafeExternalUrl('fb://profile/1')).toBeNull();
  });

  it('T065-01 rejects empty values', () => {
    expect(toSafeExternalUrl(null)).toBeNull();
    expect(toSafeExternalUrl(undefined)).toBeNull();
    expect(toSafeExternalUrl('')).toBeNull();
    expect(toSafeExternalUrl('   ')).toBeNull();
  });

  it('keeps https and http addresses', () => {
    expect(toSafeExternalUrl('https://facebook.com/x')).toBe('https://facebook.com/x');
    expect(toSafeExternalUrl('  https://facebook.com/x  ')).toBe('https://facebook.com/x');
    expect(toSafeExternalUrl('http://example.com/a.pdf')).toBe('http://example.com/a.pdf');
  });

  it('T065-03 returns tel and mailto exactly as typed', () => {
    expect(toSafeExternalUrl('tel:+966500000000')).toBe('tel:+966500000000');
    expect(toSafeExternalUrl('mailto:a@b.sa')).toBe('mailto:a@b.sa');
  });

  it('resolves a relative address against the given base', () => {
    expect(toSafeExternalUrl('/files/a.pdf', 'https://site.example')).toBe('https://site.example/files/a.pdf');
  });
});
