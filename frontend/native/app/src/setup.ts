import {storeFactory} from '@byot-frontend/common/src/redux-system/store/Store';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';
import {NativeAppState} from './redux/NativeAppState';
import {NativeAppLanguageProvider} from './i18n/providers/NativeAppLanguageProvider';
import {ApolloContext} from '@byot-frontend/common/src/graphql/context/ApolloContext';
import {createNativeApolloClient} from './graphql/NativeApolloClient';
export {default as baseTheme} from '@byot/common/theme/theme';

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

export const init = () => Promise.all([loader]);
export const apolloClient = createNativeApolloClient();
ApolloContext.apolloClient = apolloClient;
