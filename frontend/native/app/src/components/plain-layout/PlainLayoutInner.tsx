import * as React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  children?: React.ReactNode;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'column',
    },
  });

export const PlainLayoutInner: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return <View style={styles.root}>{props.children}</View>;
};
