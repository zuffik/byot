import * as React from 'react';
import {render} from '@testing-library/react';
import {YoutubeMediaPlayer} from './YoutubeMediaPlayer';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';

jest.mock('react-youtube', () => () => <div data-testid="youtube-player" />);

describe('<YoutubeMediaPlayer/>', () => {
  it('should render', () => {
    const {container, queryByTestId} = render(<YoutubeMediaPlayer media={media()} />);
    expect(queryByTestId('youtube-player')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
