import {createTheme} from '@byot-frontend/web-common/src/setup/CreateTheme';
import {storeFactory} from '@byot-frontend/common/src/redux/store/Store';
import {WebAppState} from './redux/WebAppState';
import {urlLanguageProvider} from '@byot-frontend/common/src/i18n/providers/UrlLanguageProvider';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';

export const [i18n] = createI18n(
  {
    'en-US': {},
    'sk-SK': {},
    'cs-CZ': {},
  },
  urlLanguageProvider
);
export const theme = createTheme();
export const reduxStore = storeFactory(() => new WebAppState(), 'webApp');
