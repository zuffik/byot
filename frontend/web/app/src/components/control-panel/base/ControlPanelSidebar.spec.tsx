import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelSidebar} from './ControlPanelSidebar';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';

describe('<ControlPanelSidebar/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelSidebar menuItems={[]} />);
    expect(container).toMatchSnapshot();
  });
  it('should render as many items as provided + logout item', () => {
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
    const {container, queryAllByTestId} = render(<ControlPanelSidebar menuItems={menuItems} />);
    expect(queryAllByTestId('control-panel-drawer-menu-item')).toHaveLength(menuItems.length + 1);
    expect(container).toMatchSnapshot();
  });
});
