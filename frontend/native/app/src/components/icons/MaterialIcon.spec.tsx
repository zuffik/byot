import * as React from 'react';
import {render} from '@testing-library/react-native';
import {MaterialIcon} from './MaterialIcon';

describe('<MaterialIcon/>', () => {
  it('should render', () => {
    const {asJSON} = render(<MaterialIcon name="keyboard-arrow-left" />);
    expect(asJSON()).toMatchSnapshot();
  });
});
