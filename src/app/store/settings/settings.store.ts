// settings.store.ts
import { Store, StoreConfig } from '@datorama/akita';
import { ISettingsState } from './settings.model';
import { Injectable } from '@angular/core';


export const initialSettings : ISettingsState = {
    phone: '+96612717222',
    email: 'info@gib-sa.com',
    currency: 'SAR ',
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings', resettable: true })
export class SettingsStore extends Store<ISettingsState> {
  constructor() {
    super(initialSettings);
  }
}