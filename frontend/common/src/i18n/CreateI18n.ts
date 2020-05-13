import { Languages } from './Possibilities';
import { default as i18n, i18n as i18next } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './resources/en';
import sk from './resources/sk';
import cs from './resources/cs';
import { CurrentLanguageProvider } from './providers/CurrentLanguageProvider';
import { FixedLanguageProvider } from './providers/FixedLanguageProvider';

type DeepSameObject<T> = {
  [K in keyof T]: T[K] extends object ? DeepSameObject<T[K]> : string;
};

type Resources<T> = { [K in Languages]: DeepSameObject<T> };

export const createI18n = async <T>(
  data: Resources<T>,
  provider: CurrentLanguageProvider = new FixedLanguageProvider('en')
): Promise<i18next> => {
  const resources: Resources<typeof en | T> = {
    en: { ...en, ...data.en },
    sk: { ...sk, ...data.sk },
    cs: { ...cs, ...data.cs },
  };
  await i18n.use(initReactI18next).init({
    resources,
    lng: provider.currentLanguage(),
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};
