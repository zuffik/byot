import * as React from 'react';
import {EditDeleteControls} from '@byot-frontend/web-app/src/components/elements/controls/EditDeleteControls';
import {action} from '@storybook/addon-actions';
import {EditConfirmDeleteControls} from '@byot-frontend/web-app/src/components/elements/controls/EditConfirmDeleteControls';
import {boolean} from '@storybook/addon-knobs';

export default {
  title: 'Elementary/Controls',
};

export const editDelete = () => <EditDeleteControls editUrl="/url" onDeleteClick={action('onDeleteClick')} />;

export const editDeleteWithConfirm = () => (
  <EditConfirmDeleteControls
    editUrl="/url"
    onDeleteClick={action('onDeleteClick')}
    isRemoving={boolean('isRemoving', false)}
  />
);
