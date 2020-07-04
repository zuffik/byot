import * as React from 'react';
import {AuthRouteBase} from '@byot-frontend/web-common/src/components/router/AuthRouteBase';
import {Router} from '../../router/Router';
import {RouteProps} from 'react-router-dom';

interface Props extends RouteProps {}

export const AuthRoute: React.FC<Props> = (props: Props) => {
  return <AuthRouteBase authUrl={Router.login.URI()} {...props} />;
};
