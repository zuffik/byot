import * as React from 'react';
import {Collapse, FormHelperTextProps, FormHelperText as FormHelperTextBase} from '@material-ui/core';

interface Props extends FormHelperTextProps {
  children?: React.ReactNode;
}

export const FormHelperText: React.FC<Props> = (props: Props) => {
  return (
    <Collapse in={!!props.children}>
      <FormHelperTextBase {...props}>{props.children || ' '}</FormHelperTextBase>
    </Collapse>
  );
};
