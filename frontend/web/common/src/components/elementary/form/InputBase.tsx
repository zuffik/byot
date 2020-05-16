import React from 'react';
import {ClassKeyOfStyles, ClassNameMap} from '@material-ui/styles/withStyles';
import {InputLabel, Props as InputLabelProps} from './InputLabel';
import {makeStyles, Theme} from '@material-ui/core';
import classNames from 'classnames';
import * as _ from 'lodash';

type Classes<C> = {classes?: Partial<ClassNameMap<ClassKeyOfStyles<C>>>};
export type Props<T extends Classes<C>, C = any> = T & {
  label?: string;
  InputLabelProps?: InputLabelProps;
  component: React.ComponentType<T>;
};

const styles = (theme: Theme) => ({
  label: {
    marginBottom: theme.spacing(1 / 2),
  },
});
const useStyles = makeStyles(styles);

export const InputBase = <T extends Classes<C>, C>(props: Props<T, C>) => {
  const styles = useStyles(_.omit(props, 'classes'));
  return (
    <>
      {props.label && (
        <InputLabel
          {...props.InputLabelProps}
          classes={{root: classNames(styles.label, props.InputLabelProps?.classes?.root)}}
        >
          {props.label}
        </InputLabel>
      )}
      <props.component fullWidth {...props} />
    </>
  );
};
