import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import * as setup from './setup';
import {CssBaseline, MuiThemeProvider, useMediaQuery} from '@material-ui/core';
import {BaseRouterLayout} from './components/layout/BaseRouterLayout';
import {BrowserRouter} from '@byot-frontend/web-common/src/components/router/BrowserRouter';
import {SnackbarController} from '@byot-frontend/web-common/src/components/global/SnackbarController';
import {RedirectWatcher} from '@byot-frontend/web-common/src/components/functional/routing/RedirectWatcher';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <Provider store={setup.reduxStore}>
      <MuiThemeProvider theme={setup.theme(prefersDarkMode)}>
        <CssBaseline />
        <SnackbarController>
          <BrowserRouter languageProvider={setup.languageProvider}>
            <RedirectWatcher />
            <BaseRouterLayout />
          </BrowserRouter>
        </SnackbarController>
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
