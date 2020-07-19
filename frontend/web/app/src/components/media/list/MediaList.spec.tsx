import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {MediaList} from './MediaList';
import {media} from '@byot-frontend/common/test/fixtures/dto/Media';

jest.mock('../../list/DraggableList', () => ({
  __esModule: true,
  DraggableList: () => <div data-testid="draggable-list" />,
}));

describe('<MediaList/>', () => {
  it('should render', () => {
    const {container} = render(<MediaList items={[media()]} />);
    expect(container).toMatchSnapshot();
  });
  it('should match click on the item', () => {
    const m = media();
    const onItemClick = jest.fn();
    const {container, queryAllByTestId} = render(
      <MediaList items={[media(), m]} onItemClick={onItemClick} />
    );
    const items = queryAllByTestId('media-list-item');
    expect(items).toHaveLength(2);
    fireEvent.click(items[1]);
    expect(onItemClick).toBeCalledWith(m);
    expect(container).toMatchSnapshot();
  });
  it('should display draggable list', () => {
    const {container, queryByTestId} = render(
      <MediaList items={[]} editable onOrderChanged={jest.fn()} onRemoveMedia={jest.fn()} />
    );
    expect(queryByTestId('draggable-list')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
