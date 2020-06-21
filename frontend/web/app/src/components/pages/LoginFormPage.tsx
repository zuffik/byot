import * as React from 'react';
import {LoginForm} from '@byot-frontend/web-common/src/components/auth/LoginForm';
import {LoginFormFooter} from '../auth/LoginFormFooter';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {UserLogin} from '@byot-frontend/common/src/shared/graphql/ts/types';
import {WebAppState} from '../../redux/WebAppState';
import {WebAuth} from '@byot-frontend/web-common/src/redux/process/auth/WebAuth';

interface Props {}

export const LoginFormPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const onLogin = (credentials: UserLogin) => dispatch(ProcessActionExtractor.dispatch(WebAuth, credentials));
  const resource = useSelector((state: WebAppState) => state.auth);
  return (
    <LoginForm onLogin={onLogin} loading={resource.isProcessing}>
      <LoginFormFooter />
    </LoginForm>
  );
};
