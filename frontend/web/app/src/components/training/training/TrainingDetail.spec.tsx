import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {TrainingDetail} from './TrainingDetail';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ResourceState} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';
import {training} from '@byot-frontend/common/test/fixtures/dto/Training';

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
        onDelete={jest.fn()}
        currentMedia={media()}
        media={[]}
        training={training()}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('should display skeletons', () => {
    const m = [media(), media()];
    const {container, queryByTestId, queryAllByTestId} = render(
      <TrainingDetail
        isLoading
        onMediaClick={jest.fn()}
        currentMedia={m[0]}
        media={m}
        onDelete={jest.fn()}
        training={training()}
      />
    );
    expect(queryByTestId('training-detail-media-skeleton')).not.toBeNull();
    expect(queryByTestId('training-detail-tci-skeletons')).not.toBeNull();
    expect(queryByTestId('training-detail-media-player')).toBeNull();
    expect(queryAllByTestId('media-list-item')).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
  it('should select a media', () => {
    const m = [media(), media()];
    const onMediaClick = jest.fn();
    const {container, queryByTestId, queryAllByTestId} = render(
      <TrainingDetail
        onMediaClick={onMediaClick}
        onDelete={jest.fn()}
        currentMedia={m[0]}
        media={m}
        training={training()}
      />
    );
    const listItems = queryAllByTestId('media-list-item');
    expect(queryByTestId('training-detail-media-skeleton')).toBeNull();
    expect(queryByTestId('training-detail-tci-skeletons')).toBeNull();
    expect(queryByTestId('training-detail-media-player')).not.toBeNull();
    expect(listItems).toHaveLength(2);
    fireEvent.click(listItems[1]);
    expect(onMediaClick).toBeCalledWith(m[1]);
    expect(container).toMatchSnapshot();
  });
  it('should delete media', () => {
    const m = [media(), media()];
    const onDelete = jest.fn();
    const {container, getByTestId} = render(
      <TrainingDetail
        onDelete={onDelete}
        onMediaClick={jest.fn()}
        currentMedia={m[0]}
        media={m}
        training={training()}
      />
    );
    fireEvent.click(getByTestId('app-elements-controls-remove'));
    fireEvent.click(getByTestId('app-elements-controls-confirm-yes'));
    expect(onDelete).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
