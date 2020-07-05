import {storeFactory} from '@byot-frontend/common/src/redux-system/store/Store';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';
import {NativeAppState} from './redux/NativeAppState';
import {NativeAppLanguageProvider} from './i18n/providers/NativeAppLanguageProvider';
import {dark, light} from '@eva-design/material';
import {kittenTheme} from './theme/Custom';
import {NativeAuth} from './redux/process/NativeAuth';

export {default as baseTheme} from '@byot/common/theme/theme';
new NativeAuth();
export const languageProvider = new NativeAppLanguageProvider();
export const [i18n, loader] = createI18n(
  {
    en: {},
    sk: {},
    cs: {},
  },
  languageProvider,
  {
    debug: process.env.NODE_ENV === 'development',
  }
);
export const reduxStore = storeFactory(() => new NativeAppState(), 'default', {
  useLogger: process.env.NODE_ENV === 'development',
});
export const theme = (isDark: boolean) => ({
  ...(isDark ? dark : light),
  ...kittenTheme,
});

export type Theme = Record<string, string>;

export const init = () => Promise.all([loader]);
