import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingSetList} from './TrainingSetList';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {trainingSet} from '@byot-frontend/common/test/fixtures/dto/TrainingSet';

jest.mock('@byot-frontend/web-common/src/components/functional/infinite-list/InfiniteGridList', () => ({
  __esModule: true,
  InfiniteGridList: ({children}: any) => <div data-testid="infinite-grid-list">{children}</div>,
}));

describe('<TrainingSetList/>', () => {
  it('should render', () => {
    const {container} = render(
      <TrainingSetList items={new IterableResource<ITrainingSet>([trainingSet()])} onLoadMore={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
