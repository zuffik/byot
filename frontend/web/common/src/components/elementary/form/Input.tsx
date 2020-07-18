import React from 'react';
import {makeStyles, TextField, TextFieldProps, Theme} from '@material-ui/core';
import {CreateCSSProperties, CSSProperties} from '@material-ui/styles';
import classNames from 'classnames';
import {WithStyles} from '../../../types/WithStyles';
import {FormHelperText} from './FormHelperText';
import {debounce} from 'lodash';

export type Props = Omit<TextFieldProps, 'variant'> &
  WithStyles<typeof styles> & {
    debounce?: number;
  };

const styles = (theme: Theme) => ({
  filledRoot: (props: Props) =>
    ({
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      '&:hover': !props.disabled && {
        backgroundColor: theme.palette.type == 'light' && theme.palette.grey[200],
      },
      opacity: props.disabled ? 0.1 : 1,
    } as CreateCSSProperties<Props>),
  label: {
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles(styles);

export const Input: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {helperText, ...p} = props;
  const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined =
    (props.debounce || 0) > 0 && props.onChange ? debounce(props.onChange, props.debounce) : props.onChange;
  return (
    <>
      <TextField
        fullWidth
        {...p}
        onChange={onChange}
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
