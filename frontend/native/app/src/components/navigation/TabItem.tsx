import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, TouchableOpacity, Colors} from 'react-native-ui-lib';

interface Props {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      fontSize: 12,
      color: Colors.grey40,
    },
  });

export const TabItem: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return (
    <TouchableOpacity style={styles.root} onPress={props.onPress}>
      {props.icon}
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};
