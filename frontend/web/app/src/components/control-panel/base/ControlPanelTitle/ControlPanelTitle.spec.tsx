import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelTitle} from './ControlPanelTitle';

describe('<ControlPanelTitle/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelTitle />);
    expect(container).toMatchSnapshot();
  });
});
