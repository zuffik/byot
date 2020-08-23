import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../../Screens';
import {AuthorizedNavigationTabs} from './AuthorizedNavigationTabs';
import {Colors} from 'react-native-ui-lib';

interface Props {}

const {Navigator, Screen} = createStackNavigator();

export const AuthorizedNavigationRoot: React.FC<Props> = (props: Props) => {
  return (
    <Navigator
      initialRouteName={Screens.AuthLayout.Name}
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        cardStyle: {backgroundColor: Colors.white, flex: 1},
      }}>
      <Screen name={Screens.AuthLayout.Name} component={AuthorizedNavigationTabs} />
    </Navigator>
  );
};
