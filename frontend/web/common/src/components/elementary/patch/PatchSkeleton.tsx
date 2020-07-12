import * as React from 'react';
import {makeStyles, Theme, WithStyles} from '@material-ui/core';
import {Skeleton, SkeletonProps} from '@material-ui/lab';

interface Props extends WithStyles<typeof styles>, SkeletonProps {}

const styles = (theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
});
const useStyles = makeStyles(styles);

export const PatchSkeleton: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return <Skeleton {...props} classes={{...props.classes, root: styles.root}} />;
};
