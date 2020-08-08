import * as React from 'react';
import {Grid, makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {MediaList} from '../../media/list/MediaList';
import {MediaPlayer} from '../../player/MediaPlayer';
import {MediaPlayerSkeleton} from '../../player/MediaPlayerSkeleton';
import {TripleComboItemSkeletonList} from '../../list/TripleComboItemSkeletonList';
import {ControlPanelTitle} from '../../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {ControlPanelTitleSkeleton} from '../../control-panel/base/ControlPanelTitle/ControlPanelTitleSkeleton';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';

interface Props extends WithStyles<typeof styles> {
  media: IMedia[];
  training: ITraining;
  isLoading?: boolean;
  onMediaClick: (media: IMedia) => void;
  currentMedia: IMedia;
}

const styles = (theme: Theme) => ({
  root: {},
  player: {
    maxHeight: '75vh',
    order: 1,
    [theme.breakpoints.up('sm')]: {
      order: 2,
    },
  },
  list: {
    order: 2,
    [theme.breakpoints.up('sm')]: {
      overflow: 'auto',
      maxHeight: '100vh',
      order: 1,
    },
  },
});
const useStyles = makeStyles(styles);

export const TrainingDetail: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <Grid container spacing={2} classes={{root: styles.root}}>
      <Grid item xs={12} md={4} lg={3} classes={{root: styles.list}}>
        {props.isLoading ? (
          <TripleComboItemSkeletonList />
        ) : (
          <MediaList onItemClick={props.onMediaClick} items={props.media} />
        )}
      </Grid>
      <Grid item xs={12} md={8} lg={9} classes={{root: styles.player}}>
        {props.isLoading ? (
          <>
            <MediaPlayerSkeleton />
            <ControlPanelTitleSkeleton />
          </>
        ) : (
          <>
            <MediaPlayer media={props.currentMedia} />
            <ControlPanelTitle>{props.training.label}</ControlPanelTitle>
          </>
        )}
      </Grid>
    </Grid>
  );
};
