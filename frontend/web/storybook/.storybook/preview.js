import * as React from 'react';
import 'loki/configure-react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { muiTheme } from 'storybook-addon-material-ui';
import { createTheme } from '@byot-frontend/web-common/src/setup/CreateTheme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { withI18next } from 'storybook-addon-i18next';
import { createI18n } from '@byot-frontend/common/src/i18n/CreateI18n';
import * as _ from 'lodash';
import { FixedLanguageProvider } from '@byot-frontend/common/src/i18n/providers/FixedLanguageProvider';

const mockStore = configureStore();
const langs = {
  'en-US': 'English',
  'sk-SK': 'Slovak',
  'cs-CZ': 'Czech',
}
const [i18n] = createI18n(_.mapValues(langs, () => ({})), new FixedLanguageProvider('sk-SK'));

addDecorator(withKnobs);
addDecorator(story => <BrowserRouter>{story()}</BrowserRouter>);
addDecorator(story => <Provider store={mockStore()}>{story()}</Provider>);
addDecorator(story => <><CssBaseline/>{story()}</>);
addDecorator(muiTheme([createTheme()]));
addDecorator(withI18next({
  i18n,
  languages: langs,
}))
