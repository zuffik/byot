import * as React from 'react';
import {FormControlLabel, FormControlLabelProps, makeStyles, Theme, Typography} from '@material-ui/core';
import {ClassesObject, CombineClasses} from '../../../types/CombineClasses';
import {WithStyles} from '../../../types/WithStyles';

export type Props<T extends ClassesObject<C>, C = any> = T &
  CombineClasses<WithStyles<typeof styles>, T> & {
    label: string;
    component: React.ComponentType<T>;
    FormControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  };

const styles = (theme: Theme) => ({
  label: {},
});
const useStyles = makeStyles(styles);

export const CheckboxRadioBase = <T extends ClassesObject<C>, C = any>(props: Props<T, C>) => {
  const styles = useStyles(props);
  const {component, ...radioProps} = props;
  return (
    <FormControlLabel
      {...props.FormControlLabelProps}
      control={<props.component {...(radioProps as any)} />}
      label={
        ['string', 'number'].includes(typeof props.label) ? (
          <Typography classes={{root: styles.label}}>{props.label}</Typography>
        ) : (
          props.label
        )
      }
    />
  );
};
