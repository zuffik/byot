import React from 'react';
import {Provider} from 'react-redux';
import * as setup from './setup';
import {baseTheme, theme} from './setup';
import 'react-native-gesture-handler';
import {BaseNavigation} from './components/navigation/BaseNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, View} from 'react-native';
import * as eva from '@eva-design/material';
import {ApplicationProvider} from '@ui-kitten/components';
import {useDarkMode} from 'react-native-dark-mode';
import mapping from '../mapping';
import {I18nextProvider} from 'react-i18next';
import {SplashScreenHide} from './components/navigation/SplashScreenHide';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const isDark = useDarkMode();
  return (
    <>
      <SplashScreenHide />
      <ApplicationProvider {...eva} theme={theme(isDark)} customMapping={mapping}>
        <Provider store={setup.reduxStore}>
          <I18nextProvider i18n={setup.i18n}>
            <View
              style={{
                backgroundColor: isDark ? baseTheme.colors.dark : baseTheme.colors.light,
                flex: 1,
              }}>
              <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={isDark ? baseTheme.colors.dark : baseTheme.colors.light}
              />
              <SafeAreaView style={{flex: 1, position: 'relative'}}>
                <NavigationContainer>
                  <BaseNavigation />
                </NavigationContainer>
              </SafeAreaView>
            </View>
          </I18nextProvider>
        </Provider>
      </ApplicationProvider>
    </>
  );
};

export default App;
