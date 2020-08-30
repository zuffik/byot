import * as React from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebAppState} from '../../redux/WebAppState';
import {Router} from '../../router/Router';
import {ResetPasswordForm} from '../auth/ResetPasswordForm';
import {IResetPassword} from '@byot-frontend/common/src/types/interfaces/IResetPassword';
import {SubmitResetPassword} from '@byot-frontend/web-common/src/redux/process/auth/SubmitResetPassword';

interface Props {}

export const ResetPasswordFormPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: WebAppState) => state.is.resettingPassword);
  const onSubmit = (values: IResetPassword) =>
    dispatch(ProcessActionExtractor.dispatch(SubmitResetPassword, values));
  const {token} = useParams<typeof Router.resetPassword.confirmPasswords.params>();
  if (!token) {
    return <Redirect to={Router.login.URI()} />;
  }
  return <ResetPasswordForm onSubmit={onSubmit} loading={isLoading} token={token} />;
};
