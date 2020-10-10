import * as React from 'react';
import {MaterialIcon, MaterialIconProps} from '../MaterialIcon';

interface Props extends Omit<MaterialIconProps, 'name'> {}

export const Add: React.FC<Props> = (props: Props) => {
  return <MaterialIcon {...props} name="add" />;
};
