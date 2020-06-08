/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => !process.env.STORYBOOK ? App : require('../storybook/storybook/index').default);
