import {Languages} from './Possibilities';
import {default as i18n, i18n as i18next} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './resources/en';
import sk from './resources/sk';
import cs from './resources/cs';
import {CurrentLanguageProvider} from './providers/CurrentLanguageProvider';
import * as _ from 'lodash';
import {BrowserLanguageProvider} from './providers/BrowserLanguageProvider';
import {getCurrentLanguage} from './GetCurrentLanguage';

type DeepSameObject<T> = {
  [K in keyof T]: T[K] extends object ? DeepSameObject<T[K]> : string;
};

type Resources<T> = {[K in Languages]: DeepSameObject<T>};
export const defaultLanguage: Languages = 'en';

export const createI18n = <T>(
  data: DeepSameObject<Resources<T>>,
  provider: CurrentLanguageProvider = new BrowserLanguageProvider()
): [i18next, Promise<any>] => {
  const resources: Resources<typeof en | T> = {
    en: {...en, ...(data.en as object)},
    sk: {...sk, ...(data.sk as object)},
    cs: {...cs, ...(data.cs as object)},
  };
  const loader = i18n.use(initReactI18next).init({
    resources: _.mapValues(resources, translation => ({translation})),
    lng: getCurrentLanguage(provider),
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'en',
    // todo another way
    debug: process.env.NODE_ENV === 'development',
  });

  return [i18n, loader];
};
