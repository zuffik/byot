import * as React from 'react';
import {render} from '@testing-library/react-native';
import {KeyboardArrowLeft} from './KeyboardArrowLeft';

describe('<KeyboardArrowLeft/>', () => {
  it('should render', () => {
    const {asJSON} = render(<KeyboardArrowLeft />);
    expect(asJSON()).toMatchSnapshot();
  });
});
