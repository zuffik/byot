import * as React from 'react';
import {ForgotPasswordForm} from '../auth/ForgotPasswordForm';
import {RouterBackButton} from '@byot-frontend/web-common/src/components/elementary/navigation/BackButton';

interface Props {}

export const RequestResetPasswordFormPage: React.FC<Props> = (props: Props) => {
  return <ForgotPasswordForm onSubmit={() => {}} loading={false} overTitle={<RouterBackButton />} />;
};
