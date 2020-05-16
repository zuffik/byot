import React from 'react';
import {Box, BoxProps, makeStyles, Theme, WithStyles} from '@material-ui/core';
import logo from '@byot-frontend/common/src/static/img/logo.svg';
import classNames from 'classnames';

interface Props
  extends Partial<WithStyles<typeof styles>>,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'src'> {
  BoxProps?: BoxProps;
  height?: number;
}

const styles = (theme: Theme) => ({
  root: (props: Props) => ({
    height: props.height,
  }),
  img: {
    height: '100%',
  },
});
const useStyles = makeStyles(styles);

export const Logo: React.FC<Props> = ({height = 100, ...props}: Props) => {
  const styles = useStyles({...props, height});
  const {BoxProps, ...logoProps} = props;
  return (
    <Box {...props.BoxProps} className={classNames(props.BoxProps?.className, styles.root)}>
      <img src={logo} {...logoProps} className={classNames(logoProps.className, styles.img)} />
    </Box>
  );
};
