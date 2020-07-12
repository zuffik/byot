import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {TrainingSetListItemImagePlaceholder} from '../set/TrainingSetListItemImagePlaceholder';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({});
const useStyles = makeStyles(styles);

export const TrainingListItemImagePlaceholder: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  /* may change in future */
  return <TrainingSetListItemImagePlaceholder />;
};
