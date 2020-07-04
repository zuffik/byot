import * as React from 'react';
import {RouteProps} from 'react-router-dom';
import {UnauthorizedRouteBase} from '@byot-frontend/web-common/src/components/router/UnauthorizedRouteBase';
import {Router} from '../../router/Router';

interface Props extends RouteProps {}

export const UnauthorizedRoute: React.FC<Props> = (props: Props) => {
  return <UnauthorizedRouteBase authorizedUrl={Router.URI()} {...props} />;
};
