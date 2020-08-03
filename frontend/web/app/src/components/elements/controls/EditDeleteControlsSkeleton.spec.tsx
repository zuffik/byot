import * as React from 'react';
import {render} from '@testing-library/react';
import {EditDeleteControlsSkeleton} from './EditDeleteControlsSkeleton';

describe('<EditDeleteControlsSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<EditDeleteControlsSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
