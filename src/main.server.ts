import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { environment } from './environments/environment';

// Dev only: the .NET API runs behind a self-signed certificate, which Node's
// fetch rejects during SSR/prerender (DEPTH_ZERO_SELF_SIGNED_CERT). Allow it in
// development; production uses a real certificate so verification stays on.
if (!environment.production && typeof process !== 'undefined') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
