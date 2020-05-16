import * as React from 'react';
import {CheckboxRadioBase, Props as RadioRadioBaseProps} from './CheckboxRadioBase';
import {FormControlLabel, Radio as MuiRadio, RadioProps} from '@material-ui/core';

interface Props extends Omit<RadioRadioBaseProps<RadioProps>, 'component'> {}

export const Radio: React.FC<Props> = (props: Props) => {
  return <CheckboxRadioBase component={MuiRadio} {...props} />;
};
