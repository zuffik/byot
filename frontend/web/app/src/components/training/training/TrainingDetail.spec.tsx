import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {TrainingDetail} from './TrainingDetail';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ResourceState} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';

jest.mock('../../player/MediaPlayer', () => ({
  __esModule: true,
  MediaPlayer: () => <div data-testid="training-detail-media-player" />,
}));
jest.mock('../../player/MediaPlayerSkeleton', () => ({
  __esModule: true,
  MediaPlayerSkeleton: () => <div data-testid="training-detail-media-skeleton" />,
}));
jest.mock('../../list/TripleComboItemSkeletonList', () => ({
  __esModule: true,
  TripleComboItemSkeletonList: () => <div data-testid="training-detail-tci-skeletons" />,
}));

describe('<TrainingDetail/>', () => {
  it('should render', () => {
    const {container} = render(
      <TrainingDetail
        onMediaClick={jest.fn()}
        currentMedia={media()}
        media={new IterableResource<IMedia>([])}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('should display skeletons', () => {
    const m = new IterableResource<IMedia>([media(), media()]);
    m.state = ResourceState.LOADING;
    const {container, queryByTestId, queryAllByTestId} = render(
      <TrainingDetail onMediaClick={jest.fn()} currentMedia={m.data[0]} media={m} />
    );
    expect(queryByTestId('training-detail-media-skeleton')).not.toBeNull();
    expect(queryByTestId('training-detail-tci-skeletons')).not.toBeNull();
    expect(queryByTestId('training-detail-media-player')).toBeNull();
    expect(queryAllByTestId('media-list-item')).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
  it('should select a media', () => {
    const m = new IterableResource<IMedia>([media(), media()]);
    const onMediaClick = jest.fn();
    const {container, queryByTestId, queryAllByTestId} = render(
      <TrainingDetail onMediaClick={onMediaClick} currentMedia={m.data[0]} media={m} />
    );
    const listItems = queryAllByTestId('media-list-item');
    expect(queryByTestId('training-detail-media-skeleton')).toBeNull();
    expect(queryByTestId('training-detail-tci-skeletons')).toBeNull();
    expect(queryByTestId('training-detail-media-player')).not.toBeNull();
    expect(listItems).toHaveLength(2);
    fireEvent.click(listItems[1]);
    expect(onMediaClick).toBeCalledWith(m.data[1]);
    expect(container).toMatchSnapshot();
  });
});
