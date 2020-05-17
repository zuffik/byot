import * as React from 'react';
import {PlainLayout} from '@byot-frontend/web-common/src/components/auth/PlainLayout';
import {LoginForm} from '@byot-frontend/web-common/src/components/auth/LoginForm';
import {StoryFn} from '@storybook/addons';

export default {
  title: 'User/Auth',
  decorators: [(story: StoryFn<any>) => <PlainLayout>{story()}</PlainLayout>],
};

export const plainLayout = () => <div />;

export const loginForm = () => <LoginForm />;
