import * as React from 'react';
import {render} from '@testing-library/react';
import {InfiniteListEndIcon} from './InfiniteListEndIcon';

describe('<InfiniteListEndIcon/>', () => {
  it('should render', () => {
    const {container} = render(<InfiniteListEndIcon />);
    expect(container).toMatchSnapshot();
  });
});
