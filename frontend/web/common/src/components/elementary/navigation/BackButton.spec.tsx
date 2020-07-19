import * as React from 'react';
import {render} from '@testing-library/react';
import {BackButton} from './BackButton';

describe('<BackButton/>', () => {
  it('should render', () => {
    const {container} = render(<BackButton />);
    expect(container).toMatchSnapshot();
  });
});
