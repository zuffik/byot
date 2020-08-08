import * as React from 'react';
import {ControlPanelLayout} from './ControlPanelLayout';
import {Switch, Redirect} from 'react-router-dom';
import {AuthRoute} from '../router/AuthRoute';
import {Router} from '../../router/Router';
import {TrainingSetListPage} from '../pages/TrainingSetListPage';
import {useSelector} from 'react-redux';
import {WebAppState} from '../../redux/WebAppState';
import {LogoutPage} from '../pages/LogoutPage';
import {TrainingSetCreatePage} from '../pages/TrainingSetCreatePage';
import {TrainingSetDetailPage} from '../pages/TrainingSetDetailPage';
import {TrainingSetEditPage} from '../pages/TrainingSetEditPage';
import {TrainingCreatePage} from '../pages/TrainingCreatePage';
import {TrainingDetailPage} from '../pages/TrainingDetailPage';
import {TrainingEditPage} from '../pages/TrainingEditPage';

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
        <AuthRoute exact path={Router.trainingSet.create.URI()}>
          <TrainingSetCreatePage />
        </AuthRoute>
        <AuthRoute exact path={Router.trainingSet.edit.URI()}>
          <TrainingSetEditPage />
        </AuthRoute>
        <AuthRoute exact path={Router.trainingSet.detail.URI()}>
          <TrainingSetDetailPage />
        </AuthRoute>
        <AuthRoute exact path={Router.trainingSet.training.create.URI()}>
          <TrainingCreatePage />
        </AuthRoute>
        <AuthRoute exact path={Router.training.edit.URI()}>
          <TrainingEditPage />
        </AuthRoute>
        <AuthRoute exact path={Router.training.detail.URI()}>
          <TrainingDetailPage />
        </AuthRoute>
        <Redirect to={Router.URI()} />
      </Switch>
    </ControlPanelLayout>
  );
};
