import * as React from 'react';
import {render} from '@testing-library/react';
import {Copyright} from './Copyright';

describe('<Copyright/>', () => {
  it('should render', () => {
    const {container} = render(<Copyright />);
    expect(container).toMatchSnapshot();
  });
});
