import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingListItemSkeleton} from './TrainingListItemSkeleton';

describe('<TrainingListItemSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingListItemSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
