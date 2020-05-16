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

const mockStore = configureStore();

addDecorator(withKnobs);
addDecorator(story => <BrowserRouter>{story()}</BrowserRouter>);
addDecorator(story => <Provider store={mockStore()}>{story()}</Provider>);
addDecorator(story => <><CssBaseline/>{story()}</>);
addDecorator(muiTheme([createTheme()]));
