import * as React from 'react';
import {render} from '@testing-library/react';
import {PlainLayoutNarrow} from './PlainLayoutNarrow';

describe('<PlainLayoutNarrow/>', () => {
  it('should render', () => {
    const {container} = render(<PlainLayoutNarrow />);
    expect(container).toMatchSnapshot();
  });
});
