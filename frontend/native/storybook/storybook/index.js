import * as React from 'react';
import {addDecorator, configure, getStorybookUI} from '@storybook/react-native';
import asyncStorage from '@react-native-community/async-storage';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {NativeAppState} from '@byot-frontend/native-app/src/redux/NativeAppState';
import {theme} from '@byot-frontend/native-app/src/setup';
import mapping from '@byot-frontend/native-app/mapping';
import RNBootSplash from 'react-native-bootsplash';

import './rn-addons';

RNBootSplash.hide({duration: 100});

const mockStore = configureStore([]);
addDecorator(withKnobs);
addDecorator(storyFn => {
  const isDark = boolean('Dark theme', false);
  return (
    <Provider store={mockStore(new NativeAppState())}>
      <ApplicationProvider {...eva} theme={theme(isDark)} customMapping={mapping}>
        <Layout style={{flex: 1, backgroundColor: isDark ? '#000' : '#FFF', padding: 2}}>{storyFn()}</Layout>
      </ApplicationProvider>
    </Provider>
  );
});

// import stories
configure(() => {
  require('./story-loader').loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage,
});

export default StorybookUIRoot;
