import * as React from 'react';
import {RegistrationForm} from '../user/auth/RegistrationForm';
import {RegistrationFormFooter} from '../user/auth/RegistrationFormFooter';
import {useNavigation} from '@react-navigation/native';

interface Props {}

export const RegisterScreen: React.FC<Props> = (props: Props) => {
  const nav = useNavigation();
  const onRegister = () => {};
  const onLogInPress = () => nav.goBack();
  return (
    <RegistrationForm onRegister={onRegister}>
      <RegistrationFormFooter onLogInPress={onLogInPress} />
    </RegistrationForm>
  );
};
