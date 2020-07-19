import * as React from 'react';
import {render} from '@testing-library/react';
import {MediaPlayer} from './MediaPlayer';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';
import {SourceType} from '../../../../../../common/graphql/ts/types';

jest.mock('./providers/YoutubeMediaPlayer', () => ({
  __esModule: true,
  YoutubeMediaPlayer: () => <div data-testid="youtube-media-player" />,
}));
jest.mock('./MediaPlayerContainer', () => ({
  __esModule: true,
  MediaPlayerContainer: ({children}: any) => <div>{children}</div>,
}));

describe('<MediaPlayer/>', () => {
  it('should render with youtube provider', () => {
    const m = media();
    m.source.sourceType = SourceType.YOUTUBE;
    const {container} = render(<MediaPlayer media={m} />);
    expect(container).toMatchSnapshot();
  });
});
