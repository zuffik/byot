import * as React from 'react';
import {RegistrationForm} from '../user/auth/RegistrationForm';
import {RegistrationFormFooter} from '../user/auth/RegistrationFormFooter';
import {useNavigation} from '@react-navigation/native';
import {RequestResetPasswordForm} from '../user/auth/RequestResetPasswordForm';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';

interface Props {}

export const RequestResetPasswordScreen: React.FC<Props> = (props: Props) => {
  const nav = useNavigation();
  const onSubmit = email => {};
  return (
    <PlainLayoutInner>
      <RequestResetPasswordForm onSubmit={onSubmit} />
    </PlainLayoutInner>
  );
};
