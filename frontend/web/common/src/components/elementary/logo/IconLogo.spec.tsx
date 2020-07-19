import * as React from 'react';
import {render} from '@testing-library/react';
import {IconLogo} from './IconLogo';

describe('<IconLogo/>', () => {
  it('should render', () => {
    const {container} = render(<IconLogo />);
    expect(container).toMatchSnapshot();
  });
});
