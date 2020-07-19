import * as React from 'react';
import {DrawerMenu} from '@byot-frontend/web-app/src/components/control-panel/drawer/DrawerMenu';
import {mainDrawerItems} from '../../../../common/test/fixtures/MainDrawerItems';
import {selectMenuItem} from '../../addons/SelectMenuItem';

export default {
  title: 'Auth section/Drawer',
};

export const menu = () => <DrawerMenu menu={mainDrawerItems} selected={selectMenuItem(mainDrawerItems)} />;
