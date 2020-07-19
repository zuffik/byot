import * as React from 'react';
import {render} from '@testing-library/react';
import {UnauthorizedRoute} from './UnauthorizedRoute';

describe('<UnauthorizedRoute/>', () => {
  it('should render', () => {
    const {container} = render(<UnauthorizedRoute />);
    expect(container).toMatchSnapshot();
  });
});
