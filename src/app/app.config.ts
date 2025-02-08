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
