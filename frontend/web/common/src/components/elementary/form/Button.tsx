import React from 'react';
import baseTheme from '@byot-frontend/common/src/shared/theme/theme';
import {Button as MuiButton, ButtonProps, makeStyles, Theme} from '@material-ui/core';
import classNames from 'classnames';
import {StyleRules} from '@material-ui/styles';

interface Props extends Omit<ButtonProps, 'color'> {
  // todo variant: outlined gradient
  color: ButtonProps['color'] | 'gradient';
}

const styles = (theme: Theme): StyleRules<Props> => ({
  root: (props: Props) => ({
    ...(props.color === 'gradient' && {
      background: baseTheme.colors.gradient.css,
      color: baseTheme.colors.gradient.contrast,
    }),
    paddingTop: theme.spacing(1 / 2),
    paddingBottom: theme.spacing(1 / 2),
    textTransform: 'none',
    fontWeight: 400,
  }),
  outlined: {
    paddingTop: theme.spacing(1 / 2),
    paddingBottom: theme.spacing(1 / 2),
  },
});
const useStyles = makeStyles(styles);

export const Button: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const color = props.color === 'gradient' ? 'inherit' : props.color;
  const variant = props.color === 'gradient' ? 'contained' : props.variant;
  return (
    <MuiButton
      {...props}
      color={color}
      variant={variant}
      classes={{
        ...(props.classes || {}),
        root: classNames(styles.root, props.classes?.root),
        outlined: classNames(styles.outlined, props.classes?.outlined),
      }}
    />
  );
};
