import { HttpContextToken } from '@angular/common/http';

/** Set on a request that was already repeated after a refresh; a second 401 on it is final and never starts another refresh (VULN-068). */
export const REPLAYED = new HttpContextToken<boolean>(() => false);
