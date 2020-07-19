import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingListItemImagePlaceholder} from './TrainingListItemImagePlaceholder';

describe('<TrainingListItemImagePlaceholder/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingListItemImagePlaceholder />);
    expect(container).toMatchSnapshot();
  });
});
