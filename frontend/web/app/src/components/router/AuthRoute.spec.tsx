import * as React from 'react';
import {render} from '@testing-library/react';
import {AuthRoute} from './AuthRoute';

describe('<AuthRoute/>', () => {
  it('should render', () => {
    const {container} = render(<AuthRoute />);
    expect(container).toMatchSnapshot();
  });
});
