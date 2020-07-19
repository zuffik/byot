import * as React from 'react';
import {render} from '@testing-library/react';
import {PlainLayoutFooter} from './PlainLayoutFooter';

describe('<PlainLayoutFooter/>', () => {
  it('should render', () => {
    const {container} = render(<PlainLayoutFooter />);
    expect(container).toMatchSnapshot();
  });
});
