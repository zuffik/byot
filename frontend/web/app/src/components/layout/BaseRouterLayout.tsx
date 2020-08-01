import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import {Router} from '../../router/Router';
import {AuthRoute} from '../router/AuthRoute';
import {UnauthorizedRouterLayout} from './UnauthorizedRouterLayout';
import {AuthorizedRouterLayout} from './AuthorizedRouterLayout';
import {UnauthorizedRoute} from '../router/UnauthorizedRoute';

interface Props {}

export const BaseRouterLayout: React.FC<Props> = (props: Props) => {
  return (
    <Switch>
      <UnauthorizedRoute path={[Router.login.URI(), Router.register.URI(), Router.resetPassword.URI()]}>
        <UnauthorizedRouterLayout />
      </UnauthorizedRoute>
      <AuthRoute path={Router.URI()}>
        <AuthorizedRouterLayout />
      </AuthRoute>
      <Redirect to={Router.login.URI()} />
    </Switch>
  );
};
