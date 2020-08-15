import * as React from 'react';
import {StyleSheet} from 'react-native';
import {PlainLayout} from './PlainLayout';
import {View} from 'react-native-ui-lib';

interface Props {
  children?: React.ReactNode;
  testID?: string;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    inner: {
      maxWidth: 400,
      width: '100%',
    },
  });

export const PlainLayoutNarrow: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return (
    <PlainLayout testID={props.testID} style={styles.root}>
      <View style={styles.inner}>{props.children}</View>
    </PlainLayout>
  );
};
