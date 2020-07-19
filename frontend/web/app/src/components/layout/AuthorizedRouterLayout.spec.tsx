import * as React from 'react';
import {render} from '@testing-library/react';
import {AuthorizedRouterLayout} from './AuthorizedRouterLayout';

describe('<AuthorizedRouterLayout/>', () => {
  it('should render', () => {
    const {container} = render(<AuthorizedRouterLayout />);
    expect(container).toMatchSnapshot();
  });
});
