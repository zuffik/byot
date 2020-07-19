import * as React from 'react';
import {render} from '@testing-library/react';
import {FormHelperText} from './FormHelperText';

describe('<FormHelperText/>', () => {
  it('should render', () => {
    const {container} = render(<FormHelperText />);
    expect(container).toMatchSnapshot();
  });
});
