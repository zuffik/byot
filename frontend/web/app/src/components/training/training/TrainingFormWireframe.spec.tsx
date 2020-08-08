import * as React from 'react';
import {render} from '@testing-library/react';
import {TrainingFormWireframe} from './TrainingFormWireframe';

describe('<TrainingFormWireframe/>', () => {
  it('should render', () => {
    const {container} = render(<TrainingFormWireframe />);
    expect(container).toMatchSnapshot();
  });
});
