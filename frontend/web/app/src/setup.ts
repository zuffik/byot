import {createTheme} from '@byot-frontend/web-common/src/setup/CreateTheme';
import {storeFactory} from '@byot-frontend/common/src/redux-system/store/Store';
import {WebAppState} from './redux/WebAppState';
import {UrlLanguageProvider} from '@byot-frontend/web-common/src/i18n/providers/UrlLanguageProvider';
import {createI18n} from '@byot-frontend/common/src/i18n/CreateI18n';
import {createWebApolloClient} from '@byot-frontend/web-common/src/graphql/WebApolloClient';
import {ApolloContext} from '@byot-frontend/common/src/graphql/context/ApolloContext';

export const languageProvider = new UrlLanguageProvider();
export const [i18n] = createI18n(
  {
    en: {},
    sk: {},
    cs: {},
  },
  languageProvider,
  {
    debug: false, //process.env.NODE_ENV === 'development',
  }
);
export const theme = (dark?: boolean) =>
  createTheme({
    palette: {
      type: dark ? 'dark' : 'light',
    },
  });
export const reduxStore = storeFactory(() => new WebAppState(), 'default', {
  useLogger: process.env.NODE_ENV === 'development',
});
export const apolloClient = createWebApolloClient();
ApolloContext.apolloClient = apolloClient;
