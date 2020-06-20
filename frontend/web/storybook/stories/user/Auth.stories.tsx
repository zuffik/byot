import * as React from 'react';
import {LoginForm} from '@byot-frontend/web-common/src/components/auth/LoginForm';
import {StoryFn} from '@storybook/addons';
import {action} from '@storybook/addon-actions';
import {LoginFormFooter} from '@byot-frontend/web-app/src/components/auth/LoginFormFooter';
import {boolean} from '@storybook/addon-knobs';
import {RegistrationForm} from '@byot-frontend/web-common/src/components/auth/RegistrationForm';
import {PlainLayout} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayout';
import {RegistrationFormFooter} from '@byot-frontend/web-app/src/components/auth/RegistrationFormFooter';
import {ForgotPasswordForm} from '@byot-frontend/web-app/src/components/auth/ForgotPasswordForm';

export default {
  title: 'User/Auth',
  decorators: [(story: StoryFn<any>) => <PlainLayout>{story()}</PlainLayout>],
};

export const plainLayout = () => <div />;

export const loginForm = () => (
  <LoginForm onLogin={action('onLogin')} loading={boolean('Loading', false)}>
    <LoginFormFooter />
  </LoginForm>
);

export const registrationForm = () => (
  <RegistrationForm onRegister={action('onRegister')} loading={boolean('Loading', false)}>
    <RegistrationFormFooter />
  </RegistrationForm>
);

export const resetPassword = () => (
  <ForgotPasswordForm onSubmit={action('onSubmit')} loading={boolean('Loading', false)} />
);
