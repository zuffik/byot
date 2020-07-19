import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelTwoColumnsContent} from './ControlPanelTwoColumnsContent';

describe('<ControlPanelTwoColumnsContent/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelTwoColumnsContent />);
    expect(container).toMatchSnapshot();
  });
});
