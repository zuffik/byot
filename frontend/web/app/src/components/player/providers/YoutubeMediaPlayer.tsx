import * as React from 'react';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import YouTube from 'react-youtube';
import {makeStyles, Theme} from '@material-ui/core';

interface Props {
  media: IMedia;
  onMediaFinishedPlaying: () => void;
  autoplay: boolean;
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
      <YouTube
        onEnd={() => props.onMediaFinishedPlaying()}
        videoId={props.media.source.resourceId}
        opts={{width: '100%', height: '100%', playerVars: {autoplay: props.autoplay ? 1 : 0}}}
      />
    </div>
  );
};
