import { refreshTokenInterceptor } from './core/interceptors/refreshToken/refresh-token.interceptor';
import { environment } from '../environments/environment';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { translateModuleImport } from './core/config/translate.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { BASE_URL_TOKEN } from './core/injection-tokens/base-url.token';
import { MessageService } from 'primeng/api';
import { errorHandlerInterceptor } from './core/interceptors/errorHandler/error-handler.interceptor';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    importProvidersFrom([
      HttpClientModule, 
      translateModuleImport()
    ]),
    {
      provide: BASE_URL_TOKEN, useValue: environment.apiUrl,
    },
    provideRouter(routes, withInMemoryScrolling(scrollConfig), withComponentInputBinding()),
    // Reuse the SSR-fetched HTTP responses (e.g. general/SEO settings) on the client instead of
    // re-fetching them right after hydration — that duplicate round-trip was the main cause of the
    // first-load delay behind the loading overlay. Settings are public, non-sensitive data, and are
    // already accepted as cacheable for up to 12h client-side, so reusing the SSR response is safe.
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor, 
        errorHandlerInterceptor,
        refreshTokenInterceptor, 
      ]), 
    )
  ]
};
