import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardPropTypes, Colors} from 'react-native-ui-lib';

export type PatchProps = CardPropTypes & {
  children?: React.ReactNode;
};

type Props = PatchProps;

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      backgroundColor: Colors.g10,
    },
  });

export const Patch: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return (
    <Card {...props} style={[props.style, styles.root]}>
      {props.children}
    </Card>
  );
};
