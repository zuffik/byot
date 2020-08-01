import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelMainContent} from './ControlPanelMainContent';

describe('<ControlPanelMainContent/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelMainContent />);
    expect(container).toMatchSnapshot();
  });
});
