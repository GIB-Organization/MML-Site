import { Injectable, inject, signal } from '@angular/core';
import { AuthDialogService } from '../../auth/auth-dialog.service';
import { resetStores } from '@datorama/akita';
import { Subject } from 'rxjs';

/**
 * Stores that hold the same public reference data for everyone and are kept when a session ends (VULN-067).
 * Every other store is private and is reset: a store added later is wiped on logout unless someone puts it here on purpose.
 */
export const PUBLIC_STORE_NAMES: readonly string[] = ['CompaniesStore', 'LookupsStore', 'settings', 'WebsiteStore', 'AddressStore'];

/**
 * One place that ends a session (VULN-067): requests that were sent with the old token are cancelled, so a late response cannot
 * fill a store again, and every private store goes back to its initial state.
 */
@Injectable({ providedIn: 'root' })
export class SessionLifecycleService {
  #authDialog = inject(AuthDialogService);

  /** Grows with every ended session; work that started under an older value must not write its result. */
  readonly epoch = signal(0);
  /** Emits when a session ends; requests that carried a token stop listening to their response. */
  readonly ended$ = new Subject<void>();

  endSession(): void {
    this.epoch.update(e => e + 1);
    this.ended$.next();
    resetStores({ exclude: [...PUBLIC_STORE_NAMES] });
    // typed passwords and personal details of the sign-in and registration forms go too, even if the dialog was never opened (VULN-073)
    this.#authDialog.clearCredentials();
  }
}
