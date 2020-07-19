import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {UserAvatarDropdown} from './UserAvatarDropdown';

describe('<UserAvatarDropdown/>', () => {
  it('should render', () => {
    const {container, queryByTestId} = render(<UserAvatarDropdown />);
    expect(queryByTestId('control-panel-user-avatar-dropdown-menu')).toBeNull();
    expect(container).toMatchSnapshot();
  });
  it('should render and open modal', () => {
    const {baseElement, queryByTestId} = render(<UserAvatarDropdown />);
    const trigger = queryByTestId('control-panel-user-avatar-dropdown-trigger');
    expect(trigger).not.toBeNull();
    fireEvent.click(trigger!);
    expect(queryByTestId('control-panel-user-avatar-dropdown-menu')).not.toBeNull();
    expect(baseElement).toMatchSnapshot();
  });
});
