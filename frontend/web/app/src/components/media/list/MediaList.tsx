import * as React from 'react';
import {Grid as MuiGrid, ListItemSecondaryAction} from '@material-ui/core';
import {ClearRounded} from '@material-ui/icons';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {MediaListItem} from './MediaListItem';
import {DraggableList} from '../../list/DraggableList';
import {Theme, makeStyles} from '@material-ui/core';

type EditableProps = {
  editable: true;
  onOrderChanged: (media: IMedia[]) => void;
  onRemoveMedia: (media: IMedia) => void;
};

type ViewOnlyProps = {
  editable?: false;
  onItemClick?: (media: IMedia) => void;
};

type Props = {
  items: IMedia[];
} & (ViewOnlyProps | EditableProps);

const styles = (theme: Theme) => ({
  editableItem: {
    paddingRight: theme.spacing(8),
  },
  readonlyItem: {},
  editableItemSecondaryAction: {
    cursor: 'pointer',
  },
});
const useStyles = makeStyles(styles);

export const MediaList: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const isEditable = (props: any): props is EditableProps => props?.editable;
  const Container = React.forwardRef((p: any, ref: React.Ref<any>) => (
    <MuiGrid innerRef={ref} container spacing={1} {...p} />
  ));
  const Item = React.forwardRef((p: any, ref: React.Ref<any>) => (
    <MuiGrid innerRef={ref} item xs={12} {...p} />
  ));
  return (
    <>
      {isEditable(props) ? (
        <DraggableList
          items={props.items}
          onDragEnd={props.onOrderChanged}
          id="media-list"
          itemId={m => m.id! || m.source.resourceId!}
          itemComponent={Item}
          component={Container}>
          {({item}) => (
            <MediaListItem media={item} classes={{root: styles.editableItem}}>
              <ListItemSecondaryAction
                onClick={() => props.onRemoveMedia(item)}
                classes={{root: styles.editableItemSecondaryAction}}>
                <ClearRounded />
              </ListItemSecondaryAction>
            </MediaListItem>
          )}
        </DraggableList>
      ) : (
        <Container>
          {props.items.map(item => (
            <Item key={item.id}>
              <MediaListItem
                media={item}
                classes={{root: styles.readonlyItem}}
                onClick={() => props.onItemClick?.(item)}
              />
            </Item>
          ))}
        </Container>
      )}
    </>
  );
};
