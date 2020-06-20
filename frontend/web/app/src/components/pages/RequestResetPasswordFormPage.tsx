import * as React from 'react';
import {PlainLayout} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayout';
import {ForgotPasswordForm} from '../auth/ForgotPasswordForm';

interface Props {}

export const RequestResetPasswordFormPage: React.FC<Props> = (props: Props) => {
  return (
    <PlainLayout>
      <ForgotPasswordForm onSubmit={() => {}} loading={false} />
    </PlainLayout>
  );
};
