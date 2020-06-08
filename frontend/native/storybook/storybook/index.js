import { getStorybookUI, configure, storiesOf } from '@storybook/react-native';
import asyncStorage from '@react-native-community/async-storage';

import './rn-addons';

// import stories
configure(() => {
  require('./stories')
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage
});

export default StorybookUIRoot;
