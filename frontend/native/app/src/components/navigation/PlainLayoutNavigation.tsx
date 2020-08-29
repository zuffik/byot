import * as React from 'react';
import {Screens} from '../../navigation/Screens';
import {DefaultNavigatorOptions} from '@react-navigation/native';
import {FullScreenKeyboardAvoiding} from '../screens/FullScreenKeyboardAvoiding';
import {PlainLayoutNarrow} from '../plain-layout/PlainLayoutNarrow';
import {Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/types';
import {
  PlainLayoutBackButtonPortalIn,
  PlainLayoutBackButtonPortalProvider,
} from './PlainLayoutBackButtonPortal';

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
      <PlainLayoutBackButtonPortalProvider>
        <PlainLayoutNarrow outside={<PlainLayoutBackButtonPortalIn />}>
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
      </PlainLayoutBackButtonPortalProvider>
    </FullScreenKeyboardAvoiding>
  );
};
