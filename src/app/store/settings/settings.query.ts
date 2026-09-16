import { Query } from '@datorama/akita';
import { SettingsStore } from './settings.store';
import { ISettingsState } from './settings.model';
import { inject, Injectable } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';

@Injectable({providedIn: 'root'})
export class SettingsQuery extends Query<ISettingsState> {
    
    language = inject(LanguageService);
    constructor(private _store: SettingsStore) {
        super(_store);
    }
    get phone() {
        return this.getValue().phone;
    }
    get email() {
        return this.getValue().email;
    }
    get currency() {
        return this.getValue().currency;
    }
    get seoSettings() {
        return this.getValue().seoSettings;
    }
    get generalSettings() {
        return this.getValue().generalSettings;
    }
    get privacyPolicySettings() {
        return this.getValue().privacyPolicySettings;
    }
    get termsSettings() {
        return this.getValue().termsSettings;
    }
    get privacyPolicySettings$() {
        return this.select(state => state.privacyPolicySettings);
    }
    get termsSettings$() {
        return this.select(state => state.termsSettings);
    }

    get contentKey(): 'contentAr' | 'contentEn'{
        return this.language.handleBackendLocalKeys('content')
    }

    get siteTitle(): 'siteTitleAr' | 'siteTitleEn'{
        return this.language.handleBackendLocalKeys('siteTitle')
    }

    get siteDescription(): 'siteDescriptionAr' | 'siteDescriptionEn'{
        return this.language.handleBackendLocalKeys('siteDescription')
    }
}