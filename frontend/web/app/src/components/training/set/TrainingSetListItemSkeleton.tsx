import * as React from 'react';
import {Grid, makeStyles, Theme} from '@material-ui/core';
import {Patch} from '@byot-frontend/web-common/src/components/elementary/patch/Patch';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {PatchSkeleton} from '@byot-frontend/web-common/src/components/elementary/patch/PatchSkeleton';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  image: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  title: {
    width: '50%',
    minWidth: theme.spacing(10),
    height: theme.spacing(2),
  },
  descriptions: {
    width: '100%',
    maxWidth: theme.spacing(10),
    height: theme.spacing(2),
  },
});
const useStyles = makeStyles(styles);

export const TrainingSetListItemSkeleton: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <Patch>
      <Grid container spacing={2}>
        <Grid item>
          <PatchSkeleton variant="rect" classes={{root: styles.image}} />
        </Grid>
        <Grid item xs container spacing={1}>
          <Grid item xs={12}>
            <PatchSkeleton classes={{root: styles.title}} variant="rect" width="100%" />
          </Grid>
          <Grid item xs={12}>
            <PatchSkeleton classes={{root: styles.descriptions}} variant="rect" width="100%" />
          </Grid>
          <Grid item xs={12}>
            <PatchSkeleton classes={{root: styles.descriptions}} variant="rect" width="100%" />
          </Grid>
        </Grid>
      </Grid>
    </Patch>
  );
};
