import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {FitnessCenterRounded} from '@material-ui/icons';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const useStyles = makeStyles(styles);

export const TrainingSetListItemImagePlaceholder: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <div className={styles.root}>
      <FitnessCenterRounded fontSize="large" color="disabled" />
    </div>
  );
};
