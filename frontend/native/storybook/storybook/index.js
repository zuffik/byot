import * as React from 'react';
import {addDecorator, configure, getStorybookUI} from '@storybook/react-native';
import asyncStorage from '@react-native-community/async-storage';
import {boolean, withKnobs} from '@storybook/addon-knobs';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NativeAppState} from '@byot-frontend/native-app/src/redux/NativeAppState';
import SplashScreen from 'react-native-splash-screen';

import '@byot-frontend/native-app/src/setup';
import './rn-addons';
import {loadTheme} from "@byot-frontend/native-app/src/theme/Theme";
import {View, Colors} from 'react-native-ui-lib';

SplashScreen.hide();
const mockStore = configureStore([]);
addDecorator(withKnobs);
addDecorator(storyFn => {
    const isDark = boolean('Dark theme', false);
    loadTheme(isDark);
    return (
        <Provider store={mockStore(new NativeAppState())}>
            <View style={{flex: 1}} backgroundColor={Colors.background}>
                {storyFn()}
            </View>
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
