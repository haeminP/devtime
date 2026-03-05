import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ko from './locales/ko.json'

/**
 * i18n setup.
 *
 * How it works:
 * - `t('auth.loginRequired')` → looks up the key in the active language file
 * - Default language is English
 * - Language can be switched at runtime via `i18n.changeLanguage('ko')`
 * - Keys are namespaced by feature: auth.*, timer.*, dashboard.*, etc.
 */
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
  },
  lng: 'en',           // default language
  fallbackLng: 'en',   // if a key is missing in active language, fall back to English
  interpolation: {
    escapeValue: false, // React already escapes values (XSS safe)
  },
})

export default i18n
