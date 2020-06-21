import * as React from 'react';
import {RegistrationForm} from '@byot-frontend/web-common/src/components/auth/RegistrationForm';
import {RegistrationFormFooter} from '../auth/RegistrationFormFooter';

interface Props {}

export const RegistrationFormPage: React.FC<Props> = (props: Props) => {
  return (
    <RegistrationForm onRegister={() => {}} loading={false}>
      <RegistrationFormFooter />
    </RegistrationForm>
  );
};
