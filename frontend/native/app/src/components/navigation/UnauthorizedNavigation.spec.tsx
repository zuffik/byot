import * as React from 'react';
import {render} from '@testing-library/react-native';
import {UnauthorizedNavigation} from './UnauthorizedNavigation';

describe('<UnauthorizedNavigation/>', () => {
  it('should render', () => {
    const {asJSON} = render(<UnauthorizedNavigation />);
    expect(asJSON()).toMatchSnapshot();
  });
});
