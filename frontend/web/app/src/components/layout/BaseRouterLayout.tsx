import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Router} from '../../router/Router';
import {LoginFormPage} from '../pages/LoginFormPage';
import {RegistrationFormPage} from '../pages/RegistrationFormPage';
import {RequestResetPasswordFormPage} from '../pages/RequestResetPasswordFormPage';
import {PlainLayout} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayout';

interface Props {}

export const BaseRouterLayout: React.FC<Props> = (props: Props) => {
  return (
    <Switch>
      <Route path={[Router.login.URI(), Router.register.URI(), Router.resetPassword.URI()]}>
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
          </Switch>
        </PlainLayout>
      </Route>
      <Redirect to={Router.login.URI()} />
    </Switch>
  );
};
