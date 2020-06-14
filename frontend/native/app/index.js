/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const useStorybook = false;

if (process.env.NODE_ENV === 'development' && useStorybook) {
  AppRegistry.registerComponent(appName, () => require('../storybook/storybook/index').default);
} else {
  AppRegistry.registerComponent(appName, () => App);
}

