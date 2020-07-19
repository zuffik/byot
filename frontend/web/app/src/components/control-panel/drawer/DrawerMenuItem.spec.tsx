import * as React from 'react';
import {render} from '@testing-library/react';
import {DrawerMenuItem} from './DrawerMenuItem';

describe('<DrawerMenuItem/>', () => {
  it('should render', () => {
    const {container} = render(<DrawerMenuItem link="link" />);
    expect(container).toMatchSnapshot();
  });
  it('should render selected', () => {
    const {container} = render(<DrawerMenuItem link="link" selected />);
    expect(container).toMatchSnapshot();
  });
});
