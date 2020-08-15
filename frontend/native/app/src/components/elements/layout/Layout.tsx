import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';

interface Props {}

const makeStyles = (props: Props) => StyleSheet.create({});

export const Layout: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props);
  return <View />;
};
