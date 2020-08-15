import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {LoginForm} from '@byot-frontend/native-app/src/components/user/auth/LoginForm';
import {action} from '@storybook/addon-actions';
import {LoginFormFooter} from '@byot-frontend/native-app/src/components/user/auth/LoginFormFooter';

storiesOf('User', module).add('LoginForm', () => (
  <LoginForm onSubmit={action('onSubmit')}>
    <LoginFormFooter />
  </LoginForm>
));
