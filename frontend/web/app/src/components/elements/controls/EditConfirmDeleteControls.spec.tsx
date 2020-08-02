import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {EditConfirmDeleteControls} from './EditConfirmDeleteControls';

describe('<EditConfirmDeleteControls/>', () => {
  it('should not delete the item', () => {
    const onDeleteClick = jest.fn();
    const {container, getByTestId} = render(
      <EditConfirmDeleteControls editUrl="/url" onDeleteClick={onDeleteClick} />
    );
    fireEvent.click(getByTestId('app-elements-controls-remove'));
    expect(onDeleteClick).not.toBeCalled();
    fireEvent.click(getByTestId('app-elements-controls-confirm-no'));
    expect(onDeleteClick).not.toBeCalled();
    expect(container).toMatchSnapshot();
  });
  it('should delete the item', () => {
    const onDeleteClick = jest.fn();
    const {container, getByTestId} = render(
      <EditConfirmDeleteControls editUrl="/url" onDeleteClick={onDeleteClick} />
    );
    fireEvent.click(getByTestId('app-elements-controls-remove'));
    expect(onDeleteClick).not.toBeCalled();
    fireEvent.click(getByTestId('app-elements-controls-confirm-yes'));
    expect(onDeleteClick).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
