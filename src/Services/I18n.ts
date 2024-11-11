import { loadTranslations } from '@/Lang';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: window.appConfig.locale,
  fallbackLocale: 'en-uk',
  missingWarn: false,
  fallbackWarn: false,
  messages: {},
});

export const setDefaultLocale = (locale: string): void => {
  loadTranslations(locale).then((messages) => {
    i18n.global.setLocaleMessage(locale, messages[locale]);
  });
};

export default i18n;
