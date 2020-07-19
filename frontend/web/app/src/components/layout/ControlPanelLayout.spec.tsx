import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelLayout} from './ControlPanelLayout';

describe('<ControlPanelLayout/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelLayout menuItems={[]} />);
    expect(container).toMatchSnapshot();
  });
});
