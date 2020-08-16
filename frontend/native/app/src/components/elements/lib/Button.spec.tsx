import * as React from 'react';
import {render} from '@testing-library/react-native';
import {Button} from './Button';

describe('<Button/>', () => {
  it('should render', () => {
    const {asJSON} = render(<Button onPress={jest.fn()} />);
    expect(asJSON()).toMatchSnapshot();
  });
});
