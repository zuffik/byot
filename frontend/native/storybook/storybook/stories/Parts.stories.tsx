import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Tabs} from '@byot-frontend/native-app/src/components/navigation/Tabs';
import {action} from '@storybook/addon-actions';

storiesOf('Parts', module).add('Tabs', () => (
  <Tabs
    onHomePress={action('onHomePress')}
    onCreateTrainingSetPress={action('onCreateTrainingSetPress')}
    onProfilePress={action('onProfilePress')}
  />
));
