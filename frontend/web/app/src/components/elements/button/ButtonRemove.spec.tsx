import * as React from 'react';
import {render} from '@testing-library/react';
import {ButtonRemove} from './ButtonRemove';

describe('<ButtonRemove/>', () => {
  it('should render', () => {
    const {container} = render(<ButtonRemove />);
    expect(container).toMatchSnapshot();
  });
});
