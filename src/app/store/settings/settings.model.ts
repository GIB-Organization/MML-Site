import { IGeneralSettings, ISeoSettings } from "../../models/settings.interface";

export interface ISettingsState{
    phone: string,
    email: string,
    currency?: string,
    seoSettings?:ISeoSettings,
    generalSettings?:IGeneralSettings
}