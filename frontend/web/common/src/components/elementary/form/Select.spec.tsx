import * as React from 'react';
import {render} from '@testing-library/react';
import {Select} from './Select';

describe('<Select/>', () => {
  it('should render', () => {
    const {container} = render(<Select />);
    expect(container).toMatchSnapshot();
  });
});
