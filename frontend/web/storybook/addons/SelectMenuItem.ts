import {select} from '@storybook/addon-knobs';
import {MenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';

export const selectMenuItem = (items: MenuItem[], label: string = 'Menu item') =>
  select(label, Object.assign({}, ...items.map(i => ({[i.label]: i.id}))), undefined);
