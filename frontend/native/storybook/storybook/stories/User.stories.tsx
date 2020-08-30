import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {LoginForm} from '@byot-frontend/native-app/src/components/user/auth/LoginForm';
import {action} from '@storybook/addon-actions';
import {LoginFormFooter} from '@byot-frontend/native-app/src/components/user/auth/LoginFormFooter';
import {RegistrationForm} from '@byot-frontend/native-app/src/components/user/auth/RegistrationForm';
import {RegistrationFormFooter} from '@byot-frontend/native-app/src/components/user/auth/RegistrationFormFooter';
import {RequestResetPasswordForm} from '@byot-frontend/native-app/src/components/user/auth/RequestResetPasswordForm';
import {boolean} from '@storybook/addon-knobs';
import {ResetPasswordForm} from '@byot-frontend/native-app/src/components/user/auth/ResetPasswordForm';

storiesOf('User', module)
  .add('LoginForm', () => (
    <LoginForm onSubmit={action('onSubmit')} loading={boolean('loading', false)}>
      <LoginFormFooter
        onPasswordRequestPress={action('onPasswordRequestPress')}
        onRegisterPress={action('onRegisterPress')}
      />
    </LoginForm>
  ))
  .add('RegistrationForm', () => (
    <RegistrationForm onRegister={action('onRegister')} loading={boolean('loading', false)}>
      <RegistrationFormFooter onLogInPress={action('onLogInPress')} />
    </RegistrationForm>
  ))
  .add('RequestResetPasswordForm', () => (
    <RequestResetPasswordForm onSubmit={action('onSubmit')} loading={boolean('loading', false)} />
  ))
  .add('ResetPasswordForm', () => (
    <ResetPasswordForm onSubmit={action('onSubmit')} loading={boolean('loading', false)} token="token" />
  ));
