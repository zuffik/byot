import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

interface Props {}

const {Navigator, Screen} = createStackNavigator();

export const BaseNavigation: React.FC<Props> = (props: Props) => {
  return (
    <Navigator>
      <Screen name="Login" component={BaseNavigation} />
    </Navigator>
  );
};
