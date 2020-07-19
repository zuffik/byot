import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingSetListItemSkeleton} from './TrainingSetListItemSkeleton';

describe('<TrainingSetListItemSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingSetListItemSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
