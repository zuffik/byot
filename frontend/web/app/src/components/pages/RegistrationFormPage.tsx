import * as React from 'react';
import {PlainLayout} from '@byot-frontend/web-common/src/components/plain-layout/PlainLayout';
import {RegistrationForm} from '@byot-frontend/web-common/src/components/auth/RegistrationForm';
import {RegistrationFormFooter} from '../auth/RegistrationFormFooter';

interface Props {}

// todo extract <PlainLayout/>
export const RegistrationFormPage: React.FC<Props> = (props: Props) => {
  return (
    <PlainLayout>
      <RegistrationForm onRegister={() => {}} loading={false}>
        <RegistrationFormFooter />
      </RegistrationForm>
    </PlainLayout>
  );
};
