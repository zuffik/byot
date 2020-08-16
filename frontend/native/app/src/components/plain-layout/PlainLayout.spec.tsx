import * as React from 'react';
import {render} from '@testing-library/react-native';
import {PlainLayout} from './PlainLayout';

describe('<PlainLayout/>', () => {
  it('should render', () => {
    const {asJSON} = render(<PlainLayout />);
    expect(asJSON()).toMatchSnapshot();
  });
});
