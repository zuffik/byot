import {createTheme} from '@byot-frontend/web-common/src/setup/CreateTheme';
import {storeFactory} from '@byot-frontend/common/src/redux-system/store/Store';
import {LandingPageState} from './redux/LandingPageState';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';
import {UrlLanguageProvider} from '@byot-frontend/web-common/src/i18n/providers/UrlLanguageProvider';

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
export const reduxStore = storeFactory(() => new LandingPageState());
