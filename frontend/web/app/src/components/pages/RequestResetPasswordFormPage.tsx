import * as React from 'react';
import {ForgotPasswordForm} from '../auth/ForgotPasswordForm';

interface Props {}

export const RequestResetPasswordFormPage: React.FC<Props> = (props: Props) => {
  return <ForgotPasswordForm onSubmit={() => {}} loading={false} />;
};
