import * as React from 'react';
import {DraggableList} from '@byot-frontend/web-app/src/components/list/DraggableList';
import {Patch} from '@byot-frontend/web-common/src/components/elementary/patch/Patch';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Elementary/List',
};

type Item = {id: number; label: string};

export const draggable = () => (
  <DraggableList<Item>
    itemId="id"
    onDragEnd={action('onDragEnd')}
    items={[
      {
        id: 1,
        label: 'label',
      },
      {
        id: 2,
        label: 'label 2',
      },
      {
        id: 3,
        label: 'label 3',
      },
    ]}>
    {({item}) => <Patch>{item.label}</Patch>}
  </DraggableList>
);
