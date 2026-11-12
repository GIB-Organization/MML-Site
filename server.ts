import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { environment } from './src/environments/environment';
import { buildHostPolicy, describeHostPolicy, normaliseHost, parseTrustProxyHops, securityMiddleware } from './server-security';

// The public host names of the site. SSR_ALLOWED_HOSTS (comma separated) replaces this list, for example on staging.
const defaultHosts = ((): string[] => {
  try {
    const host = new URL(environment.hyperpayShopperUrl).hostname;
    return host ? [host, host.startsWith('www.') ? host.slice(4) : `www.${host}`] : [];
  } catch {
    return [];
  }
})();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();
  const hostPolicy = buildHostPolicy(process.env['SSR_ALLOWED_HOSTS'], defaultHosts);
  console.log(describeHostPolicy(hostPolicy));

  server.disable('x-powered-by');
  // forwarded headers (client address, protocol) are only believed when it is said how many proxies sit in front (VULN-070)
  const trustProxyHops = parseTrustProxyHops(process.env['TRUST_PROXY_HOPS']);
  if (trustProxyHops !== null) server.set('trust proxy', trustProxyHops);

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // fixed security headers on every response, and a Host header that is not ours is refused before anything is rendered or served
  server.use(securityMiddleware(hostPolicy));

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    // the host was checked above; only its plain, normalised form reaches the renderer
    const host = normaliseHost(headers.host);

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
