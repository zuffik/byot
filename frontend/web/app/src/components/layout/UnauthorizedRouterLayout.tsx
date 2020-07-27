import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Router} from '../../router/Router';
import {LoginFormPage} from '../pages/LoginFormPage';
import {RegistrationFormPage} from '../pages/RegistrationFormPage';
import {RequestResetPasswordFormPage} from '../pages/RequestResetPasswordFormPage';
import {PlainLayout} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayout';
import {ResetPasswordFormPage} from '../pages/ResetPasswordFormPage';

interface Props {}

export const UnauthorizedRouterLayout: React.FC<Props> = (props: Props) => {
  return (
    <PlainLayout>
      <Switch>
        <Route exact path={Router.login.URI()}>
          <LoginFormPage />
        </Route>
        <Route exact path={Router.register.URI()}>
          <RegistrationFormPage />
        </Route>
        <Route exact path={Router.resetPassword.URI()}>
          <RequestResetPasswordFormPage />
        </Route>
        <Route exact path={Router.resetPassword.confirmPasswords.URI()}>
          <ResetPasswordFormPage />
        </Route>
      </Switch>
    </PlainLayout>
  );
};
