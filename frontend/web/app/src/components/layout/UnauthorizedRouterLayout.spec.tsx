import * as React from 'react';
import {render} from '@testing-library/react';
import {UnauthorizedRouterLayout} from './UnauthorizedRouterLayout';

describe('<UnauthorizedRouterLayout/>', () => {
  it('should render', () => {
    const {container} = render(<UnauthorizedRouterLayout />);
    expect(container).toMatchSnapshot();
  });
});
