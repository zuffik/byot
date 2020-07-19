import * as React from 'react';
import {render} from '@testing-library/react';
import {PlainLayout} from './PlainLayout';

describe('<PlainLayout/>', () => {
  it('should render', () => {
    const {container} = render(<PlainLayout>{''}</PlainLayout>);
    expect(container).toMatchSnapshot();
  });
});
