import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * The one place where text that comes from the API is turned into markup for [innerHTML] (blog body, privacy policy, terms) (VULN-063).
 * It runs Angular's own sanitizer, which removes scripts, event handlers, styles and javascript: addresses, and returns plain
 * sanitized text. It never marks anything as trusted, so nothing here can switch the sanitizer off (the CI gate
 * a grep for the bypass-HTML call of DomSanitizer under src/app must find no match).
 */
@Pipe({ name: 'safeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, value ?? '') ?? '';
  }
}
