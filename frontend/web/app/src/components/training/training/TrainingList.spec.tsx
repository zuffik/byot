import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingList} from './TrainingList';
import {training} from '@byot-frontend/common/test/fixtures/dto/Training';

jest.mock('@byot-frontend/web-common/src/components/functional/infinite-list/InfiniteGridList', () => ({
  __esModule: true,
  InfiniteGridList: ({children}: any) => <div data-testid="infinite-grid-list">{children}</div>,
}));
describe('<TrainingList/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingList items={[training()]} />);
    expect(container).toMatchSnapshot();
  });
});
