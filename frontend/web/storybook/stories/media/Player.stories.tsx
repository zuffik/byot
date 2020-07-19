import * as React from 'react';
import {MediaPlayerSkeleton} from '@byot-frontend/web-app/src/components/player/MediaPlayerSkeleton';
import {MediaPlayerContainer} from '@byot-frontend/web-app/src/components/player/MediaPlayerContainer';
import {MediaPlayerControls} from '@byot-frontend/web-app/src/components/player/MediaPlayerControls';
import {boolean, number} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {MediaPlayer} from '@byot-frontend/web-app/src/components/player/MediaPlayer';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';

export default {
  title: 'Media/Player',
};

export const skeleton = () => (
  <div style={{height: '300px', width: '400px'}}>
    <MediaPlayerSkeleton />
  </div>
);

export const container = () => (
  <MediaPlayerContainer>
    <div style={{background: '#f99', width: '100%', height: '100%'}} />
  </MediaPlayerContainer>
);

export const player = () => <MediaPlayer media={media()} />;

/*export const controls = () => (
    <div style={{padding: '20px'}}>
        <MediaPlayerControls isPlaying={boolean('Is playing', false)}
                             onPlay={action('onPlay')}
                             onPause={action('onPlay')}
                             length={500}
                             current={number('Current', 20)}
                             onCurrentChange={action('onCurrentChange')}/>
    </div>
)*/
