import * as React from 'react';
import {makeStyles, Theme, Box, BoxProps} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DragDropContext,
  DragDropContextProps,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

interface Props<T extends object> extends WithStyles<typeof styles>, Omit<DragDropContextProps, 'onDragEnd'> {
  items: T[];
  children: (arg: {
    item: T;
    draggableProvided: DraggableProvided;
    draggableSnapshot: DraggableStateSnapshot;
    droppableProvided: DroppableProvided;
    droppableSnapshot: DroppableStateSnapshot;
  }) => React.ReactNode;
  id?: string;
  itemId?: (T[keyof T] extends string | number ? keyof T : never) | ((item: T) => string);
  component?: BoxProps['component'];
  itemComponent?: BoxProps['component'];

  onDragEnd: (items: T[], result: DropResult, provided: ResponderProvided) => void;
}

const styles = (theme: Theme) => ({
  wrapper: {},
});
const useStyles = makeStyles(styles);

export const DraggableList = <T extends object>(props: Props<T>) => {
  const styles = useStyles(props);
  const [id, setId] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    setId(props.id || 'id' + (Math.random() * 10 ** 10).toString().slice(0, 10));
  }, []);

  const reorder = (list: T[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    props.onDragEnd(reorder(props.items, result.source.index, result.destination.index), result, provided);
  };

  if (!id) {
    return null;
  }
  return (
    <DragDropContext {...props} onDragEnd={onDragEnd}>
      <Droppable droppableId={id}>
        {(droppableProvided, droppableSnapshot) => (
          <Box
            component={props.component}
            {...droppableProvided.droppableProps}
            // @ts-ignore
            ref={droppableProvided.innerRef}
            className={styles.wrapper}>
            {props.items.map((item, i) => {
              const id =
                (typeof props.itemId === 'function' ? props.itemId(item) : (item as any)[props.itemId]) || i;
              return (
                <Draggable draggableId={id.toString()} key={id} index={i}>
                  {(draggableProvided, draggableSnapshot) => (
                    // @ts-ignore
                    <Box
                      ref={draggableProvided.innerRef}
                      component={props.itemComponent}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}>
                      {props.children({
                        item,
                        draggableProvided,
                        draggableSnapshot,
                        droppableProvided,
                        droppableSnapshot,
                      })}
                    </Box>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
