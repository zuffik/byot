import * as React from 'react';
import {render} from '@testing-library/react';
import {Radio} from './Radio';

describe('<Radio/>', () => {
  it('should render', () => {
    const {container} = render(<Radio />);
    expect(container).toMatchSnapshot();
  });
});
