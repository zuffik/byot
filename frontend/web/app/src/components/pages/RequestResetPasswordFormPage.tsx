import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ForgotPasswordForm} from '../auth/ForgotPasswordForm';
import {RouterBackButton} from '@byot-frontend/web-common/src/components/elementary/navigation/BackButton';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebAppState} from '../../redux/WebAppState';
import {RequestResetPassword} from '@byot-frontend/web-common/src/redux/process/auth/RequestResetPassword';

interface Props {}

export const RequestResetPasswordFormPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: WebAppState) => state.is.requestingPasswordReset);
  const onSubmit = (email: string) =>
    dispatch(ProcessActionExtractor.dispatch(RequestResetPassword, {email}));
  return <ForgotPasswordForm onSubmit={onSubmit} loading={isLoading} overTitle={<RouterBackButton />} />;
};
