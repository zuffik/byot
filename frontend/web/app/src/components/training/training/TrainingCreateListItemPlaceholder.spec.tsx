import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingCreateListItemPlaceholder} from './TrainingCreateListItemPlaceholder';

describe('<TrainingCreateListItemPlaceholder/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingCreateListItemPlaceholder />);
    expect(container).toMatchSnapshot();
  });
});
