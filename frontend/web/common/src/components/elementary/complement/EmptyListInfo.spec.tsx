import * as React from 'react';
import {render} from '@testing-library/react';
import {EmptyListInfo} from './EmptyListInfo';

describe('<EmptyListInfo/>', () => {
  it('should render', () => {
    const {container} = render(<EmptyListInfo />);
    expect(container).toMatchSnapshot();
  });
});
