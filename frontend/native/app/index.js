import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';

if (process.env.TESTING === 'true') {
  YellowBox.ignoreWarnings(['Warning:', 'Require cycle:']);
}
if (__DEV__) {
  AppRegistry.registerComponent(appName, () => require('./src/DevApp').default);
} else {
  AppRegistry.registerComponent(appName, () => require('./src/App').default);
}

