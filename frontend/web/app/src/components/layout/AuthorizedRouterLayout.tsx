import * as React from 'react';
import {ControlPanelLayout} from './ControlPanelLayout';
import {Switch, Redirect} from 'react-router-dom';
import {AuthRoute} from '../router/AuthRoute';
import {Router} from '../../router/Router';
import {TrainingSetListPage} from '../pages/TrainingSetListPage';
import {useSelector} from 'react-redux';
import {WebAppState} from '../../redux/WebAppState';
import {LogoutPage} from '../pages/LogoutPage';

interface Props {}

export const AuthorizedRouterLayout: React.FC<Props> = (props: Props) => {
  const menuItems = useSelector((state: WebAppState) => state.menuItems);
  return (
    <ControlPanelLayout menuItems={menuItems}>
      <Switch>
        <AuthRoute exact path={Router.URI()}>
          <TrainingSetListPage />
        </AuthRoute>
        <AuthRoute exact path={Router.logout.URI()}>
          <LogoutPage />
        </AuthRoute>
        <Redirect to={Router.URI()} />
      </Switch>
    </ControlPanelLayout>
  );
};
