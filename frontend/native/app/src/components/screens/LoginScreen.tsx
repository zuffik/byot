import * as React from 'react';
import {LoginForm} from '../user/auth/LoginForm';
import {LoginFormFooter} from '../user/auth/LoginFormFooter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Screens} from '../../Screens';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {NativeAuth} from '../../redux/process/auth/NativeAuth';
import {NativeAppState} from '../../redux/NativeAppState';

interface Props {}

export const LoginScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const loading = useSelector((state: NativeAppState) => state.auth.isProcessing);
  const onSubmit = (credentials: {userNameOrEmail: string; password: string}) =>
    dispatch(
      ProcessActionExtractor.dispatch(NativeAuth, {
        password: credentials.password,
        userNameOrEmail: credentials.userNameOrEmail,
      })
    );
  const onPasswordRequestPress = () => nav.navigate(Screens.RequestPasswordReset.Name);
  const onRegisterPress = () => nav.navigate(Screens.Register.Name);
  return (
    <PlainLayoutInner>
      <LoginForm loading={loading} onSubmit={onSubmit}>
        <LoginFormFooter onPasswordRequestPress={onPasswordRequestPress} onRegisterPress={onRegisterPress} />
      </LoginForm>
    </PlainLayoutInner>
  );
};
