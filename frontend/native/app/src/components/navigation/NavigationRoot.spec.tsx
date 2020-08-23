import * as React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationRoot} from './NavigationRoot';

describe('<NavigationRoot/>', () => {
  it('should render', () => {
    const {asJSON} = render(<NavigationRoot />);
    expect(asJSON()).toMatchSnapshot();
  });
});
