import {storeFactory} from '@byot-frontend/common/src/redux-system/store/Store';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';
import {NativeAppState} from './redux/NativeAppState';
import {NativeAppLanguageProvider} from './i18n/providers/NativeAppLanguageProvider';
export {default as theme} from '@byot/common/theme/theme';

export const languageProvider = new NativeAppLanguageProvider();
export const [i18n] = createI18n(
  {
    en: {},
    sk: {},
    cs: {},
  },
  languageProvider
);
export const reduxStore = storeFactory(() => new NativeAppState());
