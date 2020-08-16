import * as React from 'react';
import {render} from '@testing-library/react-native';
import {Patch} from './Patch';

describe('<Patch/>', () => {
  it('should render', () => {
    const {asJSON} = render(<Patch />);
    expect(asJSON()).toMatchSnapshot();
  });
});
