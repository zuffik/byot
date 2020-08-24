import * as React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {Colors, ViewPropTypes, View} from 'react-native-ui-lib';

export type PatchProps = ViewPropTypes & {
  children?: React.ReactNode;
  TouchableWithoutFeedbackProps?: Omit<TouchableWithoutFeedbackProps, 'onPress'>;
  onPress?: (event: GestureResponderEvent) => void;
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
    <View {...props} style={[styles.root, props.style]}>
      <TouchableWithoutFeedback {...props.TouchableWithoutFeedbackProps} onPress={props.onPress}>
        {props.children}
      </TouchableWithoutFeedback>
    </View>
  );
};
