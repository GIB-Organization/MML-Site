import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { environment } from './environments/environment';
import { assertEnvironment } from './environments/assert-environment';

// a build that points at the wrong API never starts (VULN-069)
assertEnvironment(environment);

// Dev only: the .NET API runs behind a self-signed certificate, which Node's
// fetch rejects during SSR/prerender (DEPTH_ZERO_SELF_SIGNED_CERT). Allow it in
// development; production uses a real certificate so verification stays on.
if (!environment.production && typeof process !== 'undefined') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

// Angular 18.2 hands the server platform to this function; it must be forwarded or the app boots on the browser platform (no `document`)
const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
