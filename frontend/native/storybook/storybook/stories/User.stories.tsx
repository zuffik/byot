import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {LoginForm} from '@byot-frontend/native-app/src/components/user/auth/LoginForm';
import {action} from '@storybook/addon-actions';
import {LoginFormFooter} from '@byot-frontend/native-app/src/components/user/auth/LoginFormFooter';
import {RegistrationForm} from '@byot-frontend/native-app/src/components/user/auth/RegistrationForm';

storiesOf('User', module)
  .add('LoginForm', () => (
    <LoginForm onSubmit={action('onSubmit')}>
      <LoginFormFooter />
    </LoginForm>
  ))
  .add('RegistrationForm', () => <RegistrationForm onRegister={action('onRegister')} />);
