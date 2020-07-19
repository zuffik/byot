import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingSetListItemImagePlaceholder} from './TrainingSetListItemImagePlaceholder';

describe('<TrainingSetListItemImagePlaceholder/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingSetListItemImagePlaceholder />);
    expect(container).toMatchSnapshot();
  });
});
