import React from 'react';
import {makeStyles, TextField, TextFieldProps, Theme} from '@material-ui/core';
import {CreateCSSProperties} from '@material-ui/styles';
import classNames from 'classnames';
import {WithStyles} from '../../../types/WithStyles';
import {FormHelperText} from './FormHelperText';
import {debounce} from 'lodash';

export type Props = Omit<TextFieldProps, 'variant'> &
  WithStyles<typeof styles> & {
    // by setting this prop, the input will become controlled inside
    // onChange event will be dispatched immediately
    // so the best would be to use onChangeText
    debounce?: number;
    onChangeText?: (value: string) => void;
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
  const [value, setValue] = React.useState('');
  const debounceTimeout = props.debounce || 0;
  const [debouncedOnChangeText, setDebouncedOnChangeText] = React.useState<
    undefined | ((value: string) => void)
  >(undefined);
  const {helperText, onChangeText, ...p} = props;

  React.useEffect(() => {
    setDebouncedOnChangeText(() =>
      debounceTimeout > 0 ? debounce(value => props.onChangeText?.(value), debounceTimeout) : undefined
    );
  }, [debounceTimeout]);
  React.useEffect(() => {
    debouncedOnChangeText?.(value);
  }, [value]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
    if (debounceTimeout > 0) {
      setValue(e.target.value);
    } else {
      props.onChangeText?.(e.target.value);
    }
  };
  return (
    <>
      <TextField
        fullWidth
        {...p}
        value={debounceTimeout > 0 ? value : props.value}
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
      <FormHelperText
        error={props.error}
        variant="filled"
        data-testid="common-elementary-form-input-helperText">
        {props.helperText}
      </FormHelperText>
    </>
  );
};
