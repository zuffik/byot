import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {Skeleton, SkeletonProps} from '@material-ui/lab';
import {WithStyles} from '../../../types/WithStyles';
import {CombineClasses} from '../../../types/CombineClasses';

interface Props extends CombineClasses<WithStyles<typeof styles>, SkeletonProps> {}

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
