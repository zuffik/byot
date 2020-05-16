import * as React from 'react';
import {InputLabel as MuiInputLabel, InputLabelProps, makeStyles, Theme, WithStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/styles';
import classNames from 'classnames';
import {CombineClasses} from '../../../types/CombineClasses';
import baseTheme from '@byot-frontend/common/src/shared/theme/theme';
import * as _ from 'lodash';

export interface Props extends CombineClasses<WithStyles<typeof styles>, InputLabelProps> {}

const styles = (theme: Theme): StyleRules<Props> => ({
  label: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(18),
    color: baseTheme.colors.dark,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
  },
});
const useStyles = makeStyles(styles);

export const InputLabel: React.FC<Props> = (props: Props) => {
  const styles = useStyles(_.omit(props, 'classes'));
  return (
    <MuiInputLabel {...props} classes={{root: classNames(props?.classes?.root, styles.label)}}>
      {props.children}
    </MuiInputLabel>
  );
};
