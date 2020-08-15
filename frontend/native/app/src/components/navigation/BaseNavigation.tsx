import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';

interface Props {}

const {Navigator, Screen} = createStackNavigator();

export const BaseNavigation: React.FC<Props> = (props: Props) => {
  return (
    <Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Screen name="Login" component={LoginScreen} />
    </Navigator>
  );
};
