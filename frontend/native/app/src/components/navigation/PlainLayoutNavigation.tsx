import * as React from 'react';
import {Screens} from '../../Screens';
import {DefaultNavigatorOptions} from '@react-navigation/native';
import {FullScreenKeyboardAvoiding} from '../screens/FullScreenKeyboardAvoiding';
import {PlainLayoutNarrow} from '../plain-layout/PlainLayoutNarrow';
import {Colors} from 'react-native-ui-lib';
import {StyleSheet, View} from 'react-native';
import {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/types';

interface Props {
  children: React.ReactNode;
  navigatorComponent: React.ComponentType<DefaultNavigatorOptions<StackNavigationOptions>>;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    card: {
      backgroundColor: Colors.white,
      flex: 1,
    },
  });

export const PlainLayoutNavigation: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const Navigator = props.navigatorComponent;
  return (
    <FullScreenKeyboardAvoiding>
      <PlainLayoutNarrow>
        <Navigator
          initialRouteName={Screens.Login.Name}
          screenOptions={{
            headerShown: false,
            cardOverlayEnabled: false,
            cardShadowEnabled: false,
            cardStyle: styles.card,
          }}>
          {props.children}
        </Navigator>
      </PlainLayoutNarrow>
    </FullScreenKeyboardAvoiding>
  );
};
