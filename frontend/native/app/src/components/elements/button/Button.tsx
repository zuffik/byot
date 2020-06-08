import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface Props {}

export const Button: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity>
      <Text>Te quiero</Text>
    </TouchableOpacity>
  );
};
