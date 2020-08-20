import React from 'react';
import {Provider} from 'react-redux';
import * as setup from './setup';
import 'react-native-gesture-handler';
import {UnauthorizedNavigation} from './components/navigation/UnauthorizedNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useDarkMode} from 'react-native-dark-mode';
import {I18nextProvider} from 'react-i18next';
import {SplashScreenHide} from './components/functional/SplashScreenHide';
import {loadTheme} from './theme/Theme';
import {Colors} from 'react-native-ui-lib';
import {AlertController} from './components/functional/AlertController';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const isDark = useDarkMode();
  loadTheme(isDark);
  return (
    <Provider store={setup.reduxStore}>
      <SplashScreenHide />
      <AlertController />
      <I18nextProvider i18n={setup.i18n}>
        <View
          style={{
            backgroundColor: Colors.mainBackground,
            flex: 1,
          }}>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={Colors.background}
          />
          <SafeAreaView style={{flex: 1, position: 'relative'}}>
            <NavigationContainer>
              <UnauthorizedNavigation />
            </NavigationContainer>
          </SafeAreaView>
        </View>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
