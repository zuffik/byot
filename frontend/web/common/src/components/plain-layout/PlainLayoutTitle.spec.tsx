import * as React from 'react';
import {render} from '@testing-library/react';
import {PlainLayoutTitle} from './PlainLayoutTitle';

describe('<PlainLayoutTitle/>', () => {
  it('should render', () => {
    const {container} = render(<PlainLayoutTitle>Title</PlainLayoutTitle>);
    expect(container).toMatchSnapshot();
  });
});
