import * as React from 'react';
import {render} from '@testing-library/react-native';
import {AuthorizedNavigationTabs} from './AuthorizedNavigationTabs';

describe('<AuthorizedNavigationTabs/>', () => {
  it('should render', () => {
    const {asJSON} = render(<AuthorizedNavigationTabs />);
    expect(asJSON()).toMatchSnapshot();
  });
});
