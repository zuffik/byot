import * as React from 'react';
import {render} from '@testing-library/react';
import {MediaPlayerSkeleton} from './MediaPlayerSkeleton';

describe('<MediaPlayerSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<MediaPlayerSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
