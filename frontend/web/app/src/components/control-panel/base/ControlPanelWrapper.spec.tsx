import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelWrapper} from './ControlPanelWrapper';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';

describe('<ControlPanelWrapper/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelWrapper menuItems={[]}>{''}</ControlPanelWrapper>);
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
    const {container, queryAllByTestId} = render(
      <ControlPanelWrapper menuItems={menuItems}>{''}</ControlPanelWrapper>
    );
    expect(queryAllByTestId('control-panel-drawer-menu-item')).toHaveLength(menuItems.length + 1);
    expect(container).toMatchSnapshot();
  });
});
