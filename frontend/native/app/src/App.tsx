import React from 'react';
import {Provider} from 'react-redux';
import * as setup from './setup';
import {baseTheme} from './setup';
import 'react-native-gesture-handler';
import {BaseNavigation} from './components/navigation/BaseNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useDarkMode} from 'react-native-dark-mode';
import {I18nextProvider} from 'react-i18next';
import {SplashScreenHide} from './components/navigation/SplashScreenHide';
import {loadTheme} from './theme/Theme';
import {Colors} from 'react-native-ui-lib';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const isDark = useDarkMode();
  loadTheme(isDark);
  return (
    <>
      <SplashScreenHide />
      <Provider store={setup.reduxStore}>
        <I18nextProvider i18n={setup.i18n}>
          <View
            style={{
              backgroundColor: Colors.background,
              flex: 1,
            }}>
            <StatusBar
              barStyle={isDark ? 'light-content' : 'dark-content'}
              backgroundColor={Colors.background}
            />
            <SafeAreaView style={{flex: 1, position: 'relative'}}>
              <NavigationContainer>
                <BaseNavigation />
              </NavigationContainer>
            </SafeAreaView>
          </View>
        </I18nextProvider>
      </Provider>
    </>
  );
};

export default App;
