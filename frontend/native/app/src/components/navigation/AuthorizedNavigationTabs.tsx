import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '../../Screens';
import {Text} from 'react-native-ui-lib';
import {View} from 'react-native';
import {Colors} from 'react-native-ui-lib';

interface Props {}

const {Navigator, Screen} = createBottomTabNavigator();

export const AuthorizedNavigationTabs: React.FC<Props> = (props: Props) => {
  return (
    <Navigator initialRouteName={Screens.AuthLayout.TrainingSetList.Name}>
      <Screen
        name={Screens.AuthLayout.TrainingSetList.Name}
        component={() => (
          <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Text>Homepage</Text>
          </View>
        )}
      />
    </Navigator>
  );
};
