import * as React from 'react';
import {render} from '@testing-library/react-native';
import {PlainLayoutNarrow} from './PlainLayoutNarrow';

describe('<PlainLayoutNarrow/>', () => {
  it('should render', () => {
    const {asJSON} = render(<PlainLayoutNarrow />);
    expect(asJSON()).toMatchSnapshot();
  });
});
