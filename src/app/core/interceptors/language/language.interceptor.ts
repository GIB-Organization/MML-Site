import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Sends the app's current language to the API so error/validation messages come back localized (en | ar).
export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  // translation JSON files are static assets, not API calls
  if (req.url.includes('assets/i18n')) return next(req);
  const translate = inject(TranslateService);
  const lang = translate.currentLang || translate.getDefaultLang() || 'ar';
  return next(req.clone({ setHeaders: { 'Accept-Language': lang } }));
};
