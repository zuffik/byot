import * as React from 'react';
import {Button as Btn, ButtonPropTypes, Colors, Spacings, View} from 'react-native-ui-lib';
import {ButtonProps, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Wave} from 'react-native-animated-spinkit';

type Props = Omit<ButtonProps, 'title'> &
  ButtonPropTypes & {
    variant?: 'primary' | 'secondary';
    rootStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
  };

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      borderRadius: 10,
      backgroundColor: Colors[props.variant || 'primary'],
      width: '100%',
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderBar: {
      borderRadius: 6,
    },
  });

export const Button: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const testID = props.testID || 'element-button';

  return props.loading ? (
    <View style={styles.root}>
      <Wave color={Colors.white} size={20} innerStyle={styles.loaderBar} />
    </View>
  ) : (
    <Btn testID={testID} accessibilityLabel={testID} {...props} />
  );
};
