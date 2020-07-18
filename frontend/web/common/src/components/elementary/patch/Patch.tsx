import * as React from 'react';
import {makeStyles, Theme, Box, BoxProps} from '@material-ui/core';
import {WithStyles} from '../../../types/WithStyles';
import classNames from 'classnames';

export interface PatchProps extends WithStyles<typeof styles>, BoxProps {}

interface Props extends PatchProps {
  boxRef?: React.Ref<HTMLDivElement>;
}

const styles = (theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
});
const useStyles = makeStyles(styles);

export const Patch: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <Box
      p={2}
      {...props}
      className={classNames(props.className, styles.root)}
      // @ts-ignore
      ref={props.boxRef}
    />
  );
};
