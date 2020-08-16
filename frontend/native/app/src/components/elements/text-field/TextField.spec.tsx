import * as React from 'react';
import {render} from '@testing-library/react-native';
import {TextField} from './TextField';

describe('<TextField/>', () => {
  it('should render', () => {
    const {asJSON} = render(<TextField />);
    expect(asJSON()).toMatchSnapshot();
  });
});
