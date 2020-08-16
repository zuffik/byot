import * as React from 'react';
import {Button as Btn} from 'react-native-ui-lib';
import {ButtonPropTypes} from 'react-native-ui-lib/generatedTypes';
import {ButtonProps} from 'react-native';

type Props = Omit<ButtonProps, 'title'> &
  ButtonPropTypes & {
    variant?: 'primary' | 'secondary';
  };

export const Button: React.FC<Props> = (props: Props) => {
  const testID = props.testID || 'element-button';
  return <Btn testID={testID} accessibilityLabel={testID} {...props} />;
};
