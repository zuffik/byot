import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {TrainingSetListItemSkeleton} from '../set/TrainingSetListItemSkeleton';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({});
const useStyles = makeStyles(styles);

export const TrainingListItemSkeleton: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return <TrainingSetListItemSkeleton />;
};
