import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingSetDetailSkeleton} from './TrainingSetDetailSkeleton';

describe('<TrainingSetDetailSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingSetDetailSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
