import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import * as setup from './setup';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {BaseRouterLayout} from './components/layout/BaseRouterLayout';
import {BrowserRouter} from '@byot-frontend/web-common/src/components/router/BrowserRouter';
import {SnackbarController} from '@byot-frontend/web-common/src/components/global/SnackbarController';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <React.StrictMode>
      <Provider store={setup.reduxStore}>
        <MuiThemeProvider theme={setup.theme(prefersDarkMode)}>
          <CssBaseline />
          <SnackbarController>
            <BrowserRouter languageProvider={setup.languageProvider}>
              <BaseRouterLayout />
            </BrowserRouter>
          </SnackbarController>
        </MuiThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
