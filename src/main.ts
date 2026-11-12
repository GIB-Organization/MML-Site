/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { assertEnvironment } from './environments/assert-environment';
import { akitaDevtools } from '@datorama/akita';

akitaDevtools();

// a build that points at the wrong API never starts (VULN-069)
assertEnvironment(environment);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));