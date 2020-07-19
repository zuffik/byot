import * as React from 'react';
import {render} from '@testing-library/react';
import {TripleComboItemSkeletonList} from './TripleComboItemSkeletonList';

jest.mock('../elements/list-items/TripleComboItemSkeleton', () => ({
  __esModule: true,
  TripleComboItemSkeleton: () => <div data-testid="skeleton" />,
}));

describe('<TripleComboItemSkeletonList/>', () => {
  it('should render with corresponding count', () => {
    const {container, queryAllByTestId} = render(<TripleComboItemSkeletonList skeletons={12} />);
    expect(queryAllByTestId('skeleton')).toHaveLength(12);
    expect(container).toMatchSnapshot();
  });
});
