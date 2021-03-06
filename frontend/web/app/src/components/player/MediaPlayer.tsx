import * as React from 'react';
import {MediaPlayerContainer} from './MediaPlayerContainer';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {SourceType} from '@byot-frontend/common/src/types/enums/SourceType';
import {YoutubeMediaPlayer} from './providers/YoutubeMediaPlayer';

interface Props {
  media: IMedia;
  onMediaFinishedPlaying: () => void;
  autoplay: boolean;
}

export const MediaPlayer: React.FC<Props> = (props: Props) => {
  return (
    <MediaPlayerContainer>
      {props.media.source.sourceType === SourceType.YOUTUBE && (
        <YoutubeMediaPlayer
          autoplay={props.autoplay}
          onMediaFinishedPlaying={props.onMediaFinishedPlaying}
          media={props.media}
        />
      )}
    </MediaPlayerContainer>
  );
};
