import * as React from 'react';
import {render} from '@testing-library/react-native';
import {AuthorizedNavigationRoot} from './AuthorizedNavigationRoot';

describe('<AuthorizedNavigationRoot/>', () => {
  it('should render', () => {
    const {asJSON} = render(<AuthorizedNavigationRoot />);
    expect(asJSON()).toMatchSnapshot();
  });
});
