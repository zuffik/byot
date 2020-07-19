import * as React from 'react';
import {render} from '@testing-library/react';
import {PatchSkeleton} from './PatchSkeleton';

describe('<PatchSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<PatchSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
