import { IGeneralSettings, IPrivacyPolicySettings, ISeoSettings, ITermsSettings } from "../../models/settings.interface";

export interface ISettingsState{
    phone: string,
    email: string,
    currency?: string,
    seoSettings?:ISeoSettings,
    generalSettings?:IGeneralSettings,
    privacyPolicySettings?:IPrivacyPolicySettings,
    termsSettings?:ITermsSettings
}