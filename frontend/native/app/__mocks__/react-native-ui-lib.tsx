import * as React from 'react';
import {TouchableOpacity} from 'react-native';
export {Text, View, TextInput as TextField} from 'react-native';

export {TouchableOpacity};

export const Button = TouchableOpacity;
export const Card = TouchableOpacity;
export const Checkbox = React.forwardRef(
  ({onValueChange, ...props}: {onValueChange: (value: boolean) => void} & any, ref) => (
    <TouchableOpacity ref={ref} onPress={() => onValueChange(true)} {...props} />
  )
);

export const Colors = new Proxy(
  {},
  {
    get(target: {}, p: PropertyKey, receiver: any): any {
      return '#FAFAF1';
    },
  }
);
