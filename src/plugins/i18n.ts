import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

export const defaultLocale = 'en';

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    en,
    fr,
  },
});

export function setLocale(locale: 'en' | 'fr') {
  i18n.global.locale.value = locale;
  localStorage.setItem('locale', locale);
  document.querySelector('html')?.setAttribute('lang', locale);
}
