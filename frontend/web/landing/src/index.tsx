import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import * as setup from './setup';
import {BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {BaseRouterLayout} from './components/layout/BaseRouterLayout';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={setup.reduxStore}>
      <MuiThemeProvider theme={setup.theme}>
        <CssBaseline />
        <BrowserRouter>
          <BaseRouterLayout />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
