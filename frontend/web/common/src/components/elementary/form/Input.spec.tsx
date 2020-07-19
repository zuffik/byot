import * as React from 'react';
import {render} from '@testing-library/react';
import {Input} from './Input';

describe('<Input/>', () => {
  it('should render', () => {
    const {container} = render(<Input />);
    expect(container).toMatchSnapshot();
  });
});
