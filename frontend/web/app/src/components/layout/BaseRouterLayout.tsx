import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Router} from '../../router/Router';
import {LoginFormPage} from '../pages/LoginFormPage';
import {RegistrationFormPage} from '../pages/RegistrationFormPage';

interface Props {}

export const BaseRouterLayout: React.FC<Props> = (props: Props) => {
  return (
    <Switch>
      <Route exact path={Router.login.URI()}>
        <LoginFormPage />
      </Route>
      <Route exact path={Router.register.URI()}>
        <RegistrationFormPage />
      </Route>
      <Route exact path={Router.resetPassword.URI()}>
        <LoginFormPage />
      </Route>
      <Redirect to={Router.login.URI()} />
    </Switch>
  );
};
