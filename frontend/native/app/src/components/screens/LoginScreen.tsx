import * as React from 'react';
import {LoginForm} from '../user/auth/LoginForm';
import {LoginFormFooter} from '../user/auth/LoginFormFooter';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../Screens';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';

interface Props {}

export const LoginScreen: React.FC<Props> = (props: Props) => {
  const nav = useNavigation();
  const onSubmit = () => {};
  const onPasswordRequestPress = () => {};
  const onRegisterPress = () => nav.navigate(Screens.Register.Name);
  return (
    <PlainLayoutInner>
      <LoginForm onSubmit={onSubmit}>
        <LoginFormFooter onPasswordRequestPress={onPasswordRequestPress} onRegisterPress={onRegisterPress} />
      </LoginForm>
    </PlainLayoutInner>
  );
};
