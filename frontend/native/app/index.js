import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

const displayStorybook = true;

if (process.env.NODE_ENV === 'development' && displayStorybook) {
  AppRegistry.registerComponent(appName, () => require('../storybook/storybook/index').default);
} else {
  AppRegistry.registerComponent(appName, () => require('./src/App').default);
}

