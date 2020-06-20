import {createTheme} from '@byot-frontend/web-common/src/setup/CreateTheme';
import {storeFactory} from '@byot-frontend/common/src/redux-system/store/Store';
import {LandingPageState} from './redux/LandingPageState';
import {UrlLanguageProvider} from '@byot-frontend/web-common/src/i18n/providers/UrlLanguageProvider';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';
import {WebAuth} from '@byot-frontend/web-common/src/redux/process/auth/WebAuth';

// todo remove when some actions are in project or resolve
new WebAuth();
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
