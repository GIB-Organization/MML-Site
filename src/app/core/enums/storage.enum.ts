export enum EStorageEnum {
    token = 'TOKEN',
    user = 'USER',
    /** The only credential kept by the browser (session storage, gone when the tab closes). Never the access token, never the profile (VULN-064). */
    refreshToken = 'MML_REFRESH',
    generalSettings = 'GENERAL_SETTINGS_CACHE',
    seoSettings = 'SEO_SETTINGS_CACHE'
}
