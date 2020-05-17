import * as React from 'react';
import {PlainLayout} from '@byot-frontend/web-common/src/components/auth/PlainLayout';
import {LoginForm} from '@byot-frontend/web-common/src/components/auth/LoginForm';
import {StoryFn} from '@storybook/addons';
import {action} from '@storybook/addon-actions';
import {LoginFormFooter} from '@byot-frontend/web-common/src/components/auth/LoginFormFooter';
import {boolean} from '@storybook/addon-knobs';

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
