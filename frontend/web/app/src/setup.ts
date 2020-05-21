import {createTheme} from '@byot-frontend/web-common/src/setup/CreateTheme';
import {storeFactory} from '@byot-frontend/common/src/redux-system/store/Store';
import {WebAppState} from './redux/WebAppState';
import {UrlLanguageProvider} from '@byot-frontend/common/src/i18n/providers/UrlLanguageProvider';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';

export const languageProvider = new UrlLanguageProvider();
export const [i18n] = createI18n(
  {
    en: {},
    sk: {},
    cs: {},
  },
  languageProvider
);
export const theme = createTheme();
export const reduxStore = storeFactory(() => new WebAppState());
