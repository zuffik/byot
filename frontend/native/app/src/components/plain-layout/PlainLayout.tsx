import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {Logo} from '../elements/logo/Logo';
import {PlainLayoutBackButton} from '../navigation/PlainLayoutBackButton';
import {PlainLayoutInner} from './PlainLayoutInner';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      paddingTop: 20,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      backgroundColor: Colors.white,
    },
  });

export const PlainLayout: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return (
    <View testID={props.testID} accessibilityLabel={props.testID} style={[styles.root, props.style]}>
      <Logo />
      {props.children}
    </View>
  );
};
