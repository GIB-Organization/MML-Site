import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SettingsStoreService } from './store/settings/settings-store.service';

export const appResolver: ResolveFn<boolean> = async (route, state) => {
  const settingsStoreService = inject(SettingsStoreService);
  await Promise.all([settingsStoreService.getGeneralSettings(), settingsStoreService.getSeoSettings()])
  return true;
};
