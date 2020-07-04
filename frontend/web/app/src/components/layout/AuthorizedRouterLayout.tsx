import * as React from 'react';
import {ControlPanelLayout} from './ControlPanelLayout';
import {Switch} from 'react-router-dom';
import {AuthRoute} from '../router/AuthRoute';
import {Router} from '../../router/Router';
import {TrainingListPage} from '../pages/TrainingListPage';

interface Props {}

export const AuthorizedRouterLayout: React.FC<Props> = (props: Props) => {
  return (
    <ControlPanelLayout>
      <Switch>
        <AuthRoute path={Router.URI()}>
          <TrainingListPage />
        </AuthRoute>
      </Switch>
    </ControlPanelLayout>
  );
};
