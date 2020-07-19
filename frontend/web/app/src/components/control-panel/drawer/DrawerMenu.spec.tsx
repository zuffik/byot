import * as React from 'react';
import {render} from '@testing-library/react';
import {DrawerMenu} from './DrawerMenu';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';
import {ControlPanelWrapper} from '../base/ControlPanelWrapper';

describe('<DrawerMenu/>', () => {
  it('should render', () => {
    const {container} = render(<DrawerMenu menu={[]} />);
    expect(container).toMatchSnapshot();
  });
  it('should render as many items as pr', () => {
    const menuItems: LinkMenuItem[] = [
      {
        id: 0,
        label: 'Label 0',
        link: '/route-0',
      },
      {
        id: 1,
        label: 'Label 1',
        link: '/route-1',
      },
    ];
    const {container, queryAllByTestId} = render(<DrawerMenu menu={menuItems} />);
    expect(queryAllByTestId('control-panel-drawer-menu-item')).toHaveLength(menuItems.length);
    expect(container).toMatchSnapshot();
  });
});
