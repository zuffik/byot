import * as React from 'react';
import {render} from '@testing-library/react-native';
import {PlainLayoutInner} from './PlainLayoutInner';

describe('<PlainLayoutInner/>', () => {
  it('should render', () => {
    const {asJSON} = render(<PlainLayoutInner />);
    expect(asJSON()).toMatchSnapshot();
  });
});
