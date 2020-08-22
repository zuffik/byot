import * as React from 'react';
import {render} from '@testing-library/react-native';
import {PlainLayoutBackButton} from './PlainLayoutBackButton';

describe('<PlainLayoutBackButton/>', () => {
  it('should render', () => {
    const {asJSON} = render(<PlainLayoutBackButton onClick={jest.fn()} />);
    expect(asJSON()).toMatchSnapshot();
  });
});
