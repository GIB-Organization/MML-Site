import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  buildHostPolicy, describeHostPolicy, isHostAllowed, normaliseHost, parseHosts, parseTrustProxyHops, securityHeaders,
} from './server-security';

const site = buildHostPolicy(undefined, ['gib.sa', 'www.gib.sa']);

test('T070-04 the configured host is accepted, with or without a port, in any case', () => {
  assert.equal(isHostAllowed(site, 'gib.sa'), true);
  assert.equal(isHostAllowed(site, 'GIB.SA'), true);
  assert.equal(isHostAllowed(site, 'www.gib.sa:443'), true);
});

test('T070-04 a foreign host is refused', () => {
  assert.equal(isHostAllowed(site, 'evil.test'), false);
  assert.equal(isHostAllowed(site, 'gib.sa.evil.test'), false);
  assert.equal(isHostAllowed(site, 'evilgib.sa'), false);
  assert.equal(isHostAllowed(site, 'sub.gib.sa'), false);
});

test('T070-04 a double or injected Host header is refused', () => {
  assert.equal(isHostAllowed(site, 'gib.sa, evil.test'), false);
  assert.equal(isHostAllowed(site, ['gib.sa', 'evil.test']), false);
  assert.equal(isHostAllowed(site, 'gib.sa\r\nX-Injected: 1'), false);
  assert.equal(isHostAllowed(site, 'gib.sa/path'), false);
  assert.equal(isHostAllowed(site, 'user@gib.sa'), false);
  assert.equal(isHostAllowed(site, 'gib.sa:80:81'), false);
  assert.equal(isHostAllowed(site, ''), false);
  assert.equal(isHostAllowed(site, undefined), false);
  assert.equal(isHostAllowed(site, 'a'.repeat(300)), false);
});

test('the machine itself is always reachable', () => {
  assert.equal(isHostAllowed(site, 'localhost:4000'), true);
  assert.equal(isHostAllowed(site, '127.0.0.1:4000'), true);
  assert.equal(isHostAllowed(site, '[::1]:4000'), true);
});

test('SSR_ALLOWED_HOSTS replaces the build defaults', () => {
  const policy = buildHostPolicy('staging.gib.sa, ADMIN.gib.sa', ['gib.sa']);
  assert.equal(isHostAllowed(policy, 'staging.gib.sa'), true);
  assert.equal(isHostAllowed(policy, 'admin.gib.sa'), true);
  assert.equal(isHostAllowed(policy, 'gib.sa'), false);
});

test('garbage in the setting is dropped, and an unusable setting falls back to the defaults', () => {
  assert.deepEqual(parseHosts('gib.sa, , bad host, http://x, ok.example'), ['gib.sa', 'ok.example']);
  const policy = buildHostPolicy('http://nonsense', ['gib.sa']);
  assert.equal(isHostAllowed(policy, 'gib.sa'), true);
  assert.equal(isHostAllowed(policy, 'evil.test'), false);
});

test('with no public host known the check only warns, but the header must still be a plain host', () => {
  const open = buildHostPolicy(undefined, []);
  assert.equal(open.enforced, false);
  assert.equal(isHostAllowed(open, 'anything.example'), true);
  assert.equal(isHostAllowed(open, 'a, b'), false);
  assert.match(describeHostPolicy(open), /WARNING/);
  assert.match(describeHostPolicy(site), /gib\.sa/);
});

test('normaliseHost strips the port and rejects what is not a host', () => {
  assert.equal(normaliseHost('Gib.Sa:8443'), 'gib.sa');
  assert.equal(normaliseHost('[::1]:4000'), '[::1]');
  assert.equal(normaliseHost('gib.sa:99999999'), null);
});

test('trust proxy is only switched on by an explicit hop count', () => {
  assert.equal(parseTrustProxyHops(undefined), null);
  assert.equal(parseTrustProxyHops('true'), null);
  assert.equal(parseTrustProxyHops('0'), null);
  assert.equal(parseTrustProxyHops('1'), 1);
  assert.equal(parseTrustProxyHops(' 2 '), 2);
});

test('the fixed headers do not allow sniffing or framing', () => {
  assert.equal(securityHeaders['X-Content-Type-Options'], 'nosniff');
  assert.equal(securityHeaders['X-Frame-Options'], 'DENY');
});

// ---------------------------------------------------------------- through a real Express server

import express from 'express';
import { request } from 'node:http';
import type { AddressInfo } from 'node:net';
import { securityMiddleware } from './server-security';

function get(port: number, host: string | null, path = '/page'): Promise<{ status: number; headers: Record<string, unknown>; body: string }> {
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {};
    if (host !== null) headers['Host'] = host;
    const req = request({ port, path, method: 'GET', headers, setHost: false }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode ?? 0, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('T070-04 end to end: a foreign Host never reaches the renderer; the right one does and gets the headers', async () => {
  let rendered: string[] = [];
  const server = express();
  server.disable('x-powered-by');
  server.use(securityMiddleware(site));
  server.get('*', (req, res) => { rendered.push(String(req.headers.host)); res.send('page'); });
  const listener = server.listen(0);
  const port = (listener.address() as AddressInfo).port;

  try {
    const ok = await get(port, 'gib.sa');
    assert.equal(ok.status, 200);
    assert.equal(ok.headers['x-content-type-options'], 'nosniff');
    assert.equal(ok.headers['x-frame-options'], 'DENY');
    assert.equal(ok.headers['x-powered-by'], undefined);

    const evil = await get(port, 'evil.test');
    assert.equal(evil.status, 400);
    assert.equal(evil.body, 'Bad Request');
    assert.equal(evil.headers['x-content-type-options'], 'nosniff');   // refusals carry the headers too

    assert.equal((await get(port, 'gib.sa, evil.test')).status, 400);
    assert.equal((await get(port, 'localhost:4000')).status, 200);
    assert.deepEqual(rendered, ['gib.sa', 'localhost:4000']);
  } finally {
    listener.close();
  }
});
