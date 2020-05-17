import React from 'react';
import {Input as MuiInput, InputProps, makeStyles, Theme, WithStyles} from '@material-ui/core';
import {InputBase, Props as InputBaseProps} from './InputBase';
import classNames from 'classnames';

type Props = Omit<InputBaseProps<InputProps>, 'component'> & Partial<WithStyles<typeof styles>>;

const styles = (theme: Theme) => ({
  inputRoot: {
    color: theme.palette.grey[500],
  },
  input: {
    borderBottomColor: theme.palette.grey[400],
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
  },
});
const useStyles = makeStyles(styles);

export const Input: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <InputBase
      fullWidth
      component={MuiInput}
      {...props}
      classes={{
        root: classNames(styles.inputRoot, props.classes?.root),
        input: classNames(styles.input, props.classes?.input),
      }}
    />
  );
};
