# Dependency upgrade runbook (VULN-070)

The site runs Angular 17.2.3 (out of support; the MML Site started at 17.2.3, now 18.2.14), `@angular/ssr` 17.2.1 and Express in production. Several published advisories are fixed only in newer Angular majors, so there is no patch path: the framework has to be upgraded one major at a time. This file records where things stand, what has been done, and the order for the rest. Never run `npm audit fix --force`.

## Where it stands

`npm audit --package-lock-only` (lockfile only, nothing installed):

| | Before this work | Now |
|---|---|---|
| All dependencies | 104 findings (6 critical, 62 high, 29 moderate, 7 low) | 98 (6 critical, 59 high, 28 moderate, 5 low) |
| Production graph (`--omit=dev`) | 50 (3 critical, 28 high, 15 moderate, 4 low) | 43 (3 critical, 25 high, 14 moderate, 1 low): `audit-baseline.json` |

Done so far (changes that need no Angular upgrade):

- Express 4.19.2 to 4.22.3 (and body-parser, qs, path-to-regexp, send, serve-static, cookie).
- The server no longer trusts the `Host` header (see "Server settings").
- `X-Powered-By` is off; `X-Content-Type-Options`, `X-Frame-Options` and `Referrer-Policy` are set on every response.
- Forwarded headers are trusted only when `TRUST_PROXY_HOPS` says how many proxies sit in front.
- A CI check (`.github/workflows/security.yml`, `scripts/audit-gate.mjs`) that fails when the production tree gets more critical or high findings than `audit-baseline.json`; weekly dependency PRs (`.github/dependabot.yml`; Angular and PrimeNG majors are excluded on purpose).
- `engines` (Node 18.19 or newer) and `.nvmrc` (20).

## Stage 2 done (Angular 18.2)

Angular, the CLI, `@angular/ssr` (18.2.21), `@angular/localize`, TypeScript 5.5, zone.js 0.14.10 and `@ng-bootstrap/ng-bootstrap` 17 are on the 18.2 line. PrimeNG stays on 17.18.15, which supports Angular 17 and 18, so no screen changed. `HttpClientModule` was removed (only `provideHttpClient(withFetch(), withInterceptors(...))` remains). `src/main.server.ts` now forwards the `BootstrapContext` that Angular 18.2 passes to the server `bootstrap` function; without it the app boots on the browser platform and every SSR request fails with `document is not defined`. Production audit: 2 critical, 18 high (`audit-baseline.json`). The 18.2 line fixes the SSR cross-request leak; the SSRF and Windows path advisories (fixed in 19.2.21) stay covered by the Host allowlist.

**Next: stage 3 (PrimeNG 18+).** Angular 19 and later need PrimeNG 19 or newer, which replaces the theme system and several components; it needs the theme decision below before it starts.

## Server settings

| Variable | Meaning |
|---|---|
| `SSR_ALLOWED_HOSTS` | Comma separated public host names, for example `<mml-site-host>,www.<mml-site-host>`. Replaces the built-in default (the host of `environment.hyperpayShopperUrl` and its `www.` twin). `localhost`, `127.0.0.1` and `[::1]` are always accepted. A request with another, repeated or malformed `Host` gets `400 Bad Request` before anything is rendered. **Set it on staging and on any other host name the site is served under.** |
| `TRUST_PROXY_HOPS` | Number of reverse proxies in front (for example `1`). Unset: forwarded headers are ignored. |

Check after deploying: `curl -i -H "Host: evil.test" https://<server>/` returns 400, and `curl -i https://<mml-site-host>/` returns the page with `x-content-type-options: nosniff` and no `x-powered-by`.

## What cannot be done by a patch (still open)

| Package | Finding | Real exposure | Fixed by |
|---|---|---|---|
| `@angular/ssr` 17.2.1 | request pipeline: cross-request leak (`<18.2.21`), SSRF through the host header (`<19.2.21`; the host check above removes the header route), Windows path traversal (`<=19.2.27`, Windows hosts only) | internet-reachable | stages 2 and 4 (19.2.21 or newer; prefer 21) |
| `@angular/core`, `common`, `compiler`, `platform-server`, `router` | sanitizer, i18n and SVG advisories (`<=18.2.14`, `<=19.2.25`) | reachable through rendered content | stages 2 to 6 |
| `proxy-addr` 2.0.7 | trust-proxy spoofing | only if `trust proxy` is configured with a subnet; the site uses a hop count and does not read the client address | Express 5 (stage 7) |
| `piscina`, `shell-quote`, `websocket-driver`, `tar` 6 | build-time packages | build machine and `ng serve` only | builder change (stages 5 and 6) |
| `@datorama/akita` and its `schematics-utilities` / `tar@4` chain | unmaintained; old tar in the production graph | install time only | stage 8 (replace the store) |

## Stages (one at a time; each one is released on its own)

0. Baseline: lockfile frozen (`npm ci`), `audit-baseline.json` recorded, smoke tests for login, quote flow, blog view and payment status (there is almost no unit coverage, so the safety net has to be written first).
1. 17.2 to 17.3.x (`ng update @angular/core@17 @angular/cli@17`), Node 20.
2. 17 to 18.2.x: TypeScript 5.4 or 5.5. Replace `HttpClientModule` with `provideHttpClient(withFetch(), withInterceptors(...))` only. `@angular/ssr` 18.2.x. PrimeNG 17.18 to 18 (new theming, see stage 3).
3. PrimeNG 18 UI migration (do not release together with an SSR stage): `p-dropdown` to `p-select`, `p-tabview` to `p-tabs`, `p-inputswitch` to `p-toggleswitch`, API renames for inputnumber, password, otp, multiselect, autocomplete, fileupload and dialog. Re-check Arabic (RTL) layout on every form.
4. 18 to 19.2.x: `@angular/ssr` 19.2.21 or newer; move `server.ts` to `AngularNodeAppEngine` with `allowedHosts` (replaces the allowlist in `server-security.ts`); PrimeNG 19.
5. 19 to 20: Node 20.19 or newer; the esbuild builder (`@angular/build`); PrimeNG 20.
6. 20 to 21 (22 if stable): PrimeNG 21, TypeScript 5.9, Karma builder `@angular/build:karma`. Remove `@angular/localize` if unused.
7. Express 5: path-to-regexp 8 changes the wildcard syntax (`'*'` becomes `'/*splat'`), so `server.get('*.*')` and `server.get('*')` need adapting; add a Content-Security-Policy (start in report-only; the HyperPay widget origin is `environment.hyperpayUrl`) and a rate limit.
8. Residual packages: replace `@datorama/akita` (88 files use the store libraries, this may be its own project), `@ng-bootstrap/ng-bootstrap`, `@ngx-translate/*`, `zone.js`, `@types/node`.
9. When a stage lowers the production count, run `node scripts/audit-gate.mjs --write` and commit `audit-baseline.json`. The target is 0 critical and 0 high.

After each stage: `ng build` (production, SSR, prerender), the unit specs, and an SSR smoke (`/`, `/blogs`, a blog page, `/privacy-policy`; 200, correct `lang` and `dir`). Keep the previous `dist` and container image for an instant rollback; there is no data migration.

## Open questions

- Which Node version does production run (Angular 20 and later need 20.19 or newer)?
- Is the SSR server behind nginx or IIS, and does that proxy forward the original `Host`?
- Is `dist.zip` in the repository a deployment artifact? It contains old bundles with the vulnerable framework and should not be kept in source control.
- PrimeNG v18 and later needs a theme decision from design (Aura or a custom preset).
