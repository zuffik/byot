import * as React from 'react';
import {render} from '@testing-library/react';
import {ControlPanelTitleSkeleton} from './ControlPanelTitleSkeleton';

describe('<ControlPanelTitleSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<ControlPanelTitleSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
