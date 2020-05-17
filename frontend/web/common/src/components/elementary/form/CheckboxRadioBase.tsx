import * as React from 'react';
import {FormControlLabel, makeStyles, Theme, WithStyles, FormControlLabelProps} from '@material-ui/core';
import {ClassesObject, CombineClasses} from '../../../types/CombineClasses';
import {InputLabel} from './InputLabel';
import * as _ from 'lodash';

export type Props<T extends ClassesObject<C>, C = any> = T &
  CombineClasses<WithStyles<typeof styles>, T> & {
    label: string;
    component: React.ComponentType<T>;
    FormControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  };

const styles = (theme: Theme) => ({
  label: {
    marginTop: theme.spacing(1 / 4),
  },
});
const useStyles = makeStyles(styles);

export const CheckboxRadioBase = <T extends ClassesObject<C>, C = any>(props: Props<T, C>) => {
  const styles = useStyles(_.omit(props, 'classes'));
  const {component, ...radioProps} = props;
  return (
    <FormControlLabel
      {...props.FormControlLabelProps}
      control={<props.component {...(radioProps as any)} />}
      label={
        ['string', 'number'].includes(typeof props.label) ? (
          <InputLabel classes={{root: styles.label}}>{props.label}</InputLabel>
        ) : (
          props.label
        )
      }
    />
  );
};