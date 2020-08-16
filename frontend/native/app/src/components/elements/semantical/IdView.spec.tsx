import * as React from 'react';
import {render} from '@testing-library/react-native';
import {IdView} from './IdView';

describe('<IdView/>', () => {
  it('should render', () => {
    const {asJSON} = render(<IdView testID="test-id" />);
    expect(asJSON()).toMatchSnapshot();
  });
});
