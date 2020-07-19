import * as React from 'react';
import {render} from '@testing-library/react';
import {Patch} from './Patch';

describe('<Patch/>', () => {
  it('should render', () => {
    const {container} = render(<Patch />);
    expect(container).toMatchSnapshot();
  });
});
