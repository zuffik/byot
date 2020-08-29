import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {Screens} from '../../navigation/Screens';
import {PlainLayoutNavigation} from './PlainLayoutNavigation';
import {RequestResetPasswordScreen} from '../screens/RequestResetPasswordScreen';
import {createNavigationReduxScreen} from '../../services/navigation/CreateNavigationReduxScreen';

interface Props {}

const {Navigator, Screen} = createStackNavigator();

export const UnauthorizedNavigation: React.FC<Props> = (props: Props) => {
  return (
    <PlainLayoutNavigation navigatorComponent={Navigator}>
      <Screen name={Screens.Login.Name} component={createNavigationReduxScreen(LoginScreen)} />
      <Screen name={Screens.Register.Name} component={createNavigationReduxScreen(RegisterScreen)} />
      <Screen
        name={Screens.RequestPasswordReset.Name}
        component={createNavigationReduxScreen(RequestResetPasswordScreen)}
      />
    </PlainLayoutNavigation>
  );
};
