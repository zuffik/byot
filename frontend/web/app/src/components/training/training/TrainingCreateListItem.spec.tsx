import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingCreateListItem} from './TrainingCreateListItem';

describe('<TrainingCreateListItem/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingCreateListItem trainingSetId="id" />);
    expect(container).toMatchSnapshot();
  });
});
