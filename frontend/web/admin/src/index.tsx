import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import * as setup from './setup';
import {BrowserRouter} from '@byot-frontend/web-common/src/components/router/BrowserRouter';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {BaseRouterLayout} from './components/layout/BaseRouterLayout';
import {SnackbarController} from '@byot-frontend/web-common/src/components/global/SnackbarController';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={setup.reduxStore}>
      <MuiThemeProvider theme={setup.theme}>
        <CssBaseline />
        <SnackbarController>
          <BrowserRouter languageProvider={setup.languageProvider}>
            <BaseRouterLayout />
          </BrowserRouter>
        </SnackbarController>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
