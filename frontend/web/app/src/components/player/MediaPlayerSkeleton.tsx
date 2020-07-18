import * as React from 'react';
import {Grid, makeStyles, Theme, ThemeProvider} from '@material-ui/core';
import {CSSProperties} from '@material-ui/styles';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Patch} from '@byot-frontend/web-common/src/components/elementary/patch/Patch';
import {PatchSkeleton} from '@byot-frontend/web-common/src/components/elementary/patch/PatchSkeleton';
import {theme} from '../../setup';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    minHeight: 240,
  } as CSSProperties,
  skeleton: {
    height: theme.spacing(2),
  },
});
const useStyles = makeStyles(styles);

export const MediaPlayerSkeleton: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <ThemeProvider theme={theme(true)}>
      <Patch classes={{root: styles.root}}>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <PatchSkeleton variant="rect" />
          </Grid>
          <Grid item xs={1}>
            <PatchSkeleton variant="rect" />
          </Grid>
          <Grid item xs>
            <PatchSkeleton variant="rect" />
          </Grid>
          <Grid item xs={1}>
            <PatchSkeleton variant="rect" />
          </Grid>
        </Grid>
      </Patch>
    </ThemeProvider>
  );
};
