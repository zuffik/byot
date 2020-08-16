import * as React from 'react';
import {StyleSheet, TouchableOpacityProps} from 'react-native';
import {Colors, TouchableOpacity} from 'react-native-ui-lib';

export type PatchProps = TouchableOpacityProps & {
  children?: React.ReactNode;
};

type Props = PatchProps;

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      backgroundColor: Colors.g10,
      borderRadius: 8,
    },
  });

export const Patch: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return (
    <TouchableOpacity {...props} style={[props.style, styles.root]}>
      {props.children}
    </TouchableOpacity>
  );
};
