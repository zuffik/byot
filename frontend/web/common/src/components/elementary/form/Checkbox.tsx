import * as React from 'react';
import {CheckboxRadioBase, Props as CheckboxRadioBaseProps} from './CheckboxRadioBase';
import {CheckboxProps, Checkbox as MuiCheckbox} from '@material-ui/core';

interface Props extends Omit<CheckboxRadioBaseProps<CheckboxProps>, 'component'> {}

export const Checkbox: React.FC<Props> = (props: Props) => {
  return <CheckboxRadioBase component={MuiCheckbox} {...props} />;
};
