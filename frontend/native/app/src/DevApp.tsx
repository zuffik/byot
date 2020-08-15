import * as React from 'react';
import Storage from '@react-native-community/async-storage';
import {DevSettings} from 'react-native';

interface Props {}

const DevApp: React.FC<Props> = (props: Props) => {
  const [Component, setComponent] = React.useState<React.ComponentType>(() => () => null);
  React.useEffect(() => {
    function addItem(label: string, value: '0' | '1') {
      DevSettings.addMenuItem(label, async () => {
        await Storage.setItem('dev-storybook', value);
        DevSettings.reload();
      });
    }
    async function loadComponent() {
      const showStorybook = await Storage.getItem('dev-storybook');
      if (showStorybook == '1') {
        addItem('Show App', '0');
        setComponent(() => require('../../storybook/storybook/index').default);
      } else {
        addItem('Show Storybook', '1');
        setComponent(() => require('./App').default);
      }
    }

    loadComponent().catch(console.error);
  }, []);

  return <Component />;
};

export default DevApp;
