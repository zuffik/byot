import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import * as setup from './setup';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {BaseRouterLayout} from './components/layout/BaseRouterLayout';
import {BrowserRouter} from '@byot-frontend/web-common/src/components/router/BrowserRouter';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={setup.reduxStore}>
      <MuiThemeProvider theme={setup.theme}>
        <CssBaseline />
        <BrowserRouter languageProvider={setup.languageProvider}>
          <BaseRouterLayout />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
