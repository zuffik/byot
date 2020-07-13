import * as React from 'react';
import {makeStyles, Theme, ThemeProvider, Button, Grid} from '@material-ui/core';
import {PlayArrowRounded, PauseRounded, FullscreenRounded} from '@material-ui/icons';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {theme} from '../../setup';
import {CSSProperties} from '@material-ui/styles';
import {Patch} from '@byot-frontend/web-common/src/components/elementary/patch/Patch';

interface Props extends WithStyles<typeof styles> {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;

  length: number;
  current: number;
  onCurrentChange: (current: number) => void;
}

const styles = (theme: Theme) => ({
  root: {},
  button: {
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
  },
});
const useStyles = makeStyles(styles);

export const MediaPlayerControls: React.FC<Props> = (props: Props) => {
  /*todo maybe in future*/
  const styles = useStyles(props);
  return (
    <ThemeProvider theme={theme(true)}>
      <Grid container spacing={2} classes={{root: styles.root}}>
        <Grid item>
          <Patch component={p => <Button classes={{root: styles.button}} {...p} />}>
            {props.isPlaying ? <PauseRounded /> : <PlayArrowRounded />}
          </Patch>
        </Grid>
        <Grid item xs>
          <Patch></Patch>
        </Grid>
        <Grid item>
          <Patch component={p => <Button classes={{root: styles.button}} {...p} />}>
            <FullscreenRounded />
          </Patch>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
