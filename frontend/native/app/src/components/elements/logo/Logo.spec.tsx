import * as React from 'react';
import {render} from '@testing-library/react-native';
import {Logo} from './Logo';

describe('<Logo/>', () => {
  it('should render', () => {
    const {asJSON} = render(<Logo />);
    expect(asJSON()).toMatchSnapshot();
  });
});
