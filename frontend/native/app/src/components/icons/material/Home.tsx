import * as React from 'react';
import {MaterialIcon, MaterialIconProps} from '../MaterialIcon';

interface Props extends Omit<MaterialIconProps, 'name'> {}

export const Home: React.FC<Props> = (props: Props) => {
  return <MaterialIcon {...props} name="home" />;
};
