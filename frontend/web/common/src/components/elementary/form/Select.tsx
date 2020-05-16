import React from 'react';
import {makeStyles, Select as MuiSelect, SelectProps, Theme, WithStyles} from '@material-ui/core';
import {InputBase, Props as InputBaseProps} from './InputBase';
import classNames from 'classnames';

type Props = Omit<InputBaseProps<SelectProps>, 'component'> & Partial<WithStyles<typeof styles>>;

const styles = (theme: Theme) => ({
  select: {
    paddingLeft: theme.spacing(1 / 2),
    minWidth: 50,
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
});
const useStyles = makeStyles(styles);

export const Select: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <InputBase
      component={MuiSelect}
      {...props}
      classes={{select: classNames(styles.select, props.classes?.select)}}
    />
  );
};
