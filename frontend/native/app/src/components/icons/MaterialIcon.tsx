import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconProps as BaseIconProps} from 'react-native-vector-icons/Icon';

export interface MaterialIconProps extends BaseIconProps {}

interface Props extends MaterialIconProps {}

export const MaterialIcon: React.FC<Props> = (props: Props) => {
  // this seems like it's unnecessary but when this is ready
  // https://github.com/oblador/react-native-vector-icons/issues/856
  // it'll be much more easier to add eg. `variant="outlined"` here
  // than in all its usages.
  return <Icon {...props} />;
};
