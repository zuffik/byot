import * as React from 'react';
import {render} from '@testing-library/react';
import {TripleComboItemSkeleton} from './TripleComboItemSkeleton';

describe('<TripleComboItemSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<TripleComboItemSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
