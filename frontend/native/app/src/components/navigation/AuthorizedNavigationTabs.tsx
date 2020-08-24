import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '../../Screens';
import {Text} from 'react-native-ui-lib';
import {View} from 'react-native';
import {Colors} from 'react-native-ui-lib';

interface Props {}

const {Navigator, Screen} = createBottomTabNavigator();

const Comp = (props: any) => (
  <View style={{flex: 1, backgroundColor: Colors.white}}>
    <Text testID="homepage-main-titleLabel" accessibilityLabel="homepage-main-titleLabel">
      Homepage
    </Text>
  </View>
);

export const AuthorizedNavigationTabs: React.FC<Props> = (props: Props) => {
  return (
    <Navigator initialRouteName={Screens.AuthLayout.TrainingSetList.Name}>
      <Screen name={Screens.AuthLayout.TrainingSetList.Name} component={Comp} />
    </Navigator>
  );
};
