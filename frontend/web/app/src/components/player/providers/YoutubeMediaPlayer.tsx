import * as React from 'react';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import YouTube from 'react-youtube';
import {makeStyles, Theme} from '@material-ui/core';

interface Props {
  media: IMedia;
}
const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    '& > div': {
      width: '100%',
      height: '100%',
    },
  },
});
const useStyles = makeStyles(styles);

export const YoutubeMediaPlayer: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <div className={styles.root}>
      <YouTube videoId={props.media.source.resourceId} opts={{width: '100%', height: '100%'}} />
    </div>
  );
};
