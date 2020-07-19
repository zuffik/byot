import * as React from 'react';
import {Grid, makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {MediaList} from '../../media/list/MediaList';
import {MediaPlayer} from '../../player/MediaPlayer';
import {MediaPlayerSkeleton} from '../../player/MediaPlayerSkeleton';
import {TripleComboItemSkeletonList} from '../../list/TripleComboItemSkeletonList';

interface Props extends WithStyles<typeof styles> {
  media: IterableResource<IMedia>;
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
      <Grid item xs={12} sm={4} md={3} classes={{root: styles.list}}>
        {props.media.isProcessing ? (
          <TripleComboItemSkeletonList />
        ) : (
          <MediaList onItemClick={props.onMediaClick} items={props.media.data} />
        )}
      </Grid>
      <Grid item xs={12} sm={8} md={9} classes={{root: styles.player}}>
        {props.media.isProcessing ? <MediaPlayerSkeleton /> : <MediaPlayer media={props.currentMedia} />}
      </Grid>
    </Grid>
  );
};
