import * as React from 'react';
import {PlainLayout} from '@byot-frontend/web-common/src/components/auth/PlainLayout';
import {LoginForm} from '@byot-frontend/web-common/src/components/auth/LoginForm';
import {LoginFormFooter} from '../auth/LoginFormFooter';
import {useDispatch} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {Login} from '@byot-frontend/common/src/redux/process/auth/Login';
import {UserLogin} from '@byot-frontend/common/src/shared/graphql/ts/types';

interface Props {}

export const LoginFormPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const onLogin = (credentials: UserLogin) => dispatch(ProcessActionExtractor.dispatch(Login, credentials));
  return (
    <PlainLayout>
      <LoginForm onLogin={onLogin}>
        <LoginFormFooter />
      </LoginForm>
    </PlainLayout>
  );
};
