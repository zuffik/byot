import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, TouchableOpacity} from 'react-native-ui-lib';

interface Props {
  icon: React.ReactNode;
  onPress: () => void;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary,
      color: Colors.white,
      borderRadius: 56,
      width: 56,
      height: 56,
      marginTop: -12,
      shadowColor: Colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });

export const TabItemLarge: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return (
    <TouchableOpacity style={styles.root} onPress={props.onPress}>
      {props.icon}
    </TouchableOpacity>
  );
};
