import React from 'react';
import {makeStyles, TextField, TextFieldProps, Theme} from '@material-ui/core';
import classNames from 'classnames';
import {WithStyles} from '../../../types/WithStyles';
import {FormHelperText} from './FormHelperText';

export type Props = Omit<TextFieldProps, 'variant'> & WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
  filledRoot: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.type == 'light' && theme.palette.grey[200],
    },
  },
  label: {
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles(styles);

export const Input: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {helperText, ...p} = props;
  return (
    <>
      <TextField
        fullWidth
        {...p}
        variant="filled"
        InputLabelProps={{
          ...props.InputLabelProps,
          classes: {
            root: classNames(styles.label, props.InputLabelProps?.classes?.root),
          },
        }}
        InputProps={{
          disableUnderline: true,
          ...props.InputProps,
          classes: {
            root: classNames(styles.filledRoot, props.InputProps?.classes?.root),
          },
        }}
      />
      <FormHelperText error={props.error} variant="filled">
        {props.helperText}
      </FormHelperText>
    </>
  );
};
