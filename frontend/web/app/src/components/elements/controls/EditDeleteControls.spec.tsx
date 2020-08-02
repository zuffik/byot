import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {EditDeleteControls} from './EditDeleteControls';

describe('<EditDeleteControls/>', () => {
  it('should render', () => {
    const onDeleteClick = jest.fn();
    const {container, getByTestId} = render(
      <EditDeleteControls editUrl="/url" onDeleteClick={onDeleteClick} />
    );
    fireEvent.click(getByTestId('app-elements-controls-remove'));
    expect(container).toMatchSnapshot();
    expect(onDeleteClick).toBeCalled();
  });
});
