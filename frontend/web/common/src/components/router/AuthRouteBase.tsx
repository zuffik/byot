import * as React from 'react';
import {RouteProps, Route, Redirect} from 'react-router-dom';
import {WebState} from '../../redux/WebState';
import {useSelector} from 'react-redux';

interface Props extends RouteProps {
  authUrl: string;
}

export const AuthRouteBase: React.FC<Props> = (props: Props) => {
  const auth = useSelector((state: WebState) => state.auth);
  if (!auth.data) {
    return <Redirect to={props.authUrl} />;
  }
  const {authUrl, ...routeProps} = props;
  return <Route {...routeProps} />;
};
