import * as React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RequestResetPasswordForm} from '../user/auth/RequestResetPasswordForm';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {RequestResetPassword} from '@byot-frontend/common/src/redux/process/auth/RequestResetPassword';

interface Props {}

export const RequestResetPasswordScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const onSubmit = (email: string) =>
    dispatch(ProcessActionExtractor.dispatch(RequestResetPassword, {email}));
  return (
    <PlainLayoutInner>
      <RequestResetPasswordForm onSubmit={onSubmit} />
    </PlainLayoutInner>
  );
};
