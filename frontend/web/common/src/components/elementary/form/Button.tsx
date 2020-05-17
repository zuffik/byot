import React from 'react';
import baseTheme from '@byot-frontend/common/src/shared/theme/theme';
import {Button as MuiButton, ButtonProps, Fade, makeStyles, Theme, useTheme} from '@material-ui/core';
import classNames from 'classnames';
import {StyleRules} from '@material-ui/styles';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {WithStyles} from '../../../types/WithStyles';
import {CombineClasses} from '../../../types/CombineClasses';

interface Props extends CombineClasses<Omit<ButtonProps, 'color'>, WithStyles<typeof styles>> {
  // todo variant: outlined gradient
  color?: ButtonProps['color'] | 'gradient';
  loading?: boolean;
}

const styles = (theme: Theme): StyleRules<Props> => ({
  root: (props: Props) => ({
    ...(props.color === 'gradient' && {
      background: baseTheme.colors.gradient.css,
      color: baseTheme.colors.gradient.contrast,
    }),
    fontWeight: 400,
    position: 'relative',
  }),
  inner: (props: Props) => ({
    ...(props.loading && {visibility: 'hidden'}),
  }),
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      height: theme.spacing(2) + 2,
    },
  },
});
const useStyles = makeStyles(styles);

export const Button: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const theme = useTheme();
  const color = (props.color === 'gradient' ? 'secondary' : props.color) || 'primary';
  const variant = (props.color === 'gradient' ? 'contained' : props.variant) || 'contained';
  const psColor = ['primary', 'secondary'].includes(color) && (color as 'primary' | 'secondary');
  const loaderColor = psColor
    ? theme.palette[psColor][variant !== 'outlined' ? 'contrastText' : 'main']
    : theme.palette.common.black;
  const {loading, ...buttonProps} = props;

  return (
    <MuiButton
      {...buttonProps}
      color={color}
      variant={variant}
      classes={{
        ...(props.classes || {}),
        root: classNames(styles.root, props.classes?.root),
      }}
    >
      <Fade in={!props.loading}>
        <span className={styles.inner} data-testid="common-elementary-button-children">
          {props.children}
        </span>
      </Fade>
      <Fade in={props.loading}>
        <div className={styles.loader} data-testid="common-elementary-button-loader">
          <ScaleLoader loading height={theme.spacing(2)} color={loaderColor} />
        </div>
      </Fade>
    </MuiButton>
  );
};
