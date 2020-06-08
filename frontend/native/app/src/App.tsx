import React from 'react';
import {Provider} from 'react-redux';
import * as setup from './setup';
import 'react-native-gesture-handler';
import {BaseNavigation} from './components/navigation/BaseNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={setup.reduxStore}>
      <SafeAreaView>
        <StatusBar />
        <NavigationContainer>
          <BaseNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
