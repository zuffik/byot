import * as React from 'react';
import {LoginFormFooter} from './LoginFormFooter';
import {render} from '@testing-library/react';

describe('<LoginFormFooter/>', () => {
  it('should render', () => {
    const {container} = render(<LoginFormFooter />);
    expect(container).toMatchSnapshot();
  });
});
