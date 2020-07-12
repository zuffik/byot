import * as React from 'react';
import {ControlPanelLayout} from '@byot-frontend/web-app/src/components/layout/ControlPanelLayout';
import {mainDrawerItems} from '../../fixtures/MainDrawerItems';
import {selectMenuItem} from '../../addons/SelectMenuItem';
import {ControlPanelTwoColumnsContent} from '@byot-frontend/web-app/src/components/control-panel/base/ControlPanelTwoColumnsContent';
import {SearchField} from '@byot-frontend/web-app/src/components/control-panel/search/SearchField';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Auth section/Layout',
};

export const controlPanelLayout = () => (
  <ControlPanelLayout menuItems={mainDrawerItems} selected={selectMenuItem(mainDrawerItems)} />
);

export const controlPanelWithSearch = () => (
  <ControlPanelLayout menuItems={mainDrawerItems} selected={selectMenuItem(mainDrawerItems)}>
    <ControlPanelTwoColumnsContent secondaryContent={<SearchField value="" onChange={action('onChange')} />}>
      <div style={{background: '#F99', height: '50vh', width: '100%'}} />
    </ControlPanelTwoColumnsContent>
  </ControlPanelLayout>
);
