import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelTwoColumnsMainContent} from './ControlPanelTwoColumnsMainContent';

describe('<ControlPanelTwoColumnsMainContent/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelTwoColumnsMainContent />);
    expect(container).toMatchSnapshot();
  });
});
