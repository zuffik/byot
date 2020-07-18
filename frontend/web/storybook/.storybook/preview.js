import * as React from 'react';
import 'loki/configure-react';
import { addDecorator } from '@storybook/react';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import { createTheme } from '@byot-frontend/web-common/src/setup/CreateTheme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { withI18next } from 'storybook-addon-i18next';
import { createI18n } from '@byot-frontend/common/src/i18n/CreateI18n';
import * as _ from 'lodash';
import { FixedLanguageProvider } from '@byot-frontend/common/src/i18n/providers/FixedLanguageProvider';
import StoryRouter from 'storybook-react-router';

const mockStore = configureStore();
const langs = {
  'en-US': 'English',
  'sk-SK': 'Slovak',
  'cs-CZ': 'Czech',
}
const [i18n] = createI18n(_.mapValues(langs, () => ({})), new FixedLanguageProvider('sk'), {debug: true});

addDecorator(withKnobs);
addDecorator(story => <Provider store={mockStore()}>{story()}</Provider>);
addDecorator(story => <ThemeProvider theme={createTheme({palette: {type: boolean('Global: dark', false) ? 'dark' : 'light'}})}><CssBaseline/>{story()}</ThemeProvider>);
addDecorator(withI18next({
  i18n,
  languages: langs,
}));
addDecorator(StoryRouter());
