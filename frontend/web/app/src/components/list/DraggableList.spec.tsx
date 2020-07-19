import * as React from 'react';
import {render} from '@testing-library/react';
import {DraggableList} from './DraggableList';

jest.mock('react-beautiful-dnd', () => ({
  __esModule: true,
  Draggable: (props: any) => <div data-testid="react-beautiful-dnd-draggable">{props.children}</div>,
  Droppable: (props: any) => <div data-testid="react-beautiful-dnd-droppable">{props.children}</div>,
  DragDropContext: (props: any) => (
    <div data-testid="react-beautiful-dnd-dragdrop-context">{props.children}</div>
  ),
}));

describe('<DraggableList/>', () => {
  it('should render', () => {
    const {container} = render(
      <DraggableList
        onDragEnd={jest.fn()}
        itemId={i => i.label}
        items={[{label: 'Label 1'}, {label: 'Label 2'}, {label: 'Label 3'}]}>
        {jest.fn()}
      </DraggableList>
    );
    expect(container).toMatchSnapshot();
  });
});
