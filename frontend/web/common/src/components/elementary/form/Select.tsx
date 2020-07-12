import React from 'react';
import {makeStyles, TextFieldProps, Theme} from '@material-ui/core';
import {Input} from './Input';
import {WithStyles} from '../../../types/WithStyles';

type Props = Omit<TextFieldProps, 'variant' | 'select'> & WithStyles<typeof styles>;

const styles = (theme: Theme) => ({});
const useStyles = makeStyles(styles);

export const Select: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return <Input select {...props} />;
};
