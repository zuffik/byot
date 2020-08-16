import * as React from 'react';
import {View} from 'react-native';

interface Props {
  testID: string;
  children?: React.ReactNode;
}

export const IdView: React.FC<Props> = (props: Props) => {
  return (
    <View testID={props.testID} accessibilityLabel={props.testID}>
      {props.children}
    </View>
  );
};
