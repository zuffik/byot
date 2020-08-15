import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

if (__DEV__) {
  AppRegistry.registerComponent(appName, () => require('./src/DevApp').default);
} else {
  AppRegistry.registerComponent(appName, () => require('./src/App').default);
}

