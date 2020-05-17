import {Languages} from './Possibilities';
import {default as i18n, i18n as i18next} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './resources/en';
import sk from './resources/sk';
import cs from './resources/cs';
import {CurrentLanguageProvider} from './providers/CurrentLanguageProvider';
import {FixedLanguageProvider} from './providers/FixedLanguageProvider';

type DeepSameObject<T> = {
  [K in keyof T]: T[K] extends object ? DeepSameObject<T[K]> : string;
};

type Resources<T> = {[K in Languages]: {translation: DeepSameObject<T>}};

export const createI18n = <T>(
  data: Resources<T>['translation'],
  provider: CurrentLanguageProvider = new FixedLanguageProvider('en-US')
): [i18next, Promise<any>] => {
  const resources: Resources<typeof en | T> = {
    'en-US': {translation: {...en, ...data['en-US']}},
    'sk-SK': {translation: {...sk, ...data['sk-SK']}},
    'cs-CZ': {translation: {...cs, ...data['cs-CZ']}},
  };
  const loader = i18n.use(initReactI18next).init({
    resources,
    lng: provider.currentLanguage(),
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'en-US',
    // todo another way
    debug: process.env.NODE_ENV === 'development',
  });

  return [i18n, loader];
};
