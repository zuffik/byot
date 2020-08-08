import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingFormSkeleton} from './TrainingFormSkeleton';

describe('<TrainingFormSkeleton/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingFormSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
