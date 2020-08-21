import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {Screens} from '../../Screens';
import {PlainLayoutNavigation} from './PlainLayoutNavigation';
import {RequestResetPasswordScreen} from '../screens/RequestResetPasswordScreen';

interface Props {}

const {Navigator, Screen} = createStackNavigator();

export const UnauthorizedNavigation: React.FC<Props> = (props: Props) => {
  return (
    <PlainLayoutNavigation navigatorComponent={Navigator}>
      <Screen name={Screens.Login.Name} component={LoginScreen} />
      <Screen name={Screens.Register.Name} component={RegisterScreen} />
      <Screen name={Screens.RequestPasswordReset.Name} component={RequestResetPasswordScreen} />
    </PlainLayoutNavigation>
  );
};
