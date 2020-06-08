import React from 'react';
import {Example} from './Example';
import {storiesOf} from '@storybook/react-native';
import {Button} from '@byot-frontend/native-app/src/components/elements/button/Button';

storiesOf('Example', module)
  .add('default', () => <Example />)
  .add('button', () => <Button />);
