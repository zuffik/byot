import * as React from 'react';
import {render} from '@testing-library/react';
import {DateTimeTypography} from './DateTimeTypography';

describe('<DateTimeTypography/>', () => {
  it('should render', () => {
    const {container} = render(<DateTimeTypography />);
    expect(container).toMatchSnapshot();
  });
});
