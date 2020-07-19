import * as React from 'react';
import {render} from '@testing-library/react';
import {MediaListItemPlaceholder} from './MediaListItemPlaceholder';

describe('<MediaListItemPlaceholder/>', () => {
  it('should render', () => {
    const {container} = render(<MediaListItemPlaceholder />);
    expect(container).toMatchSnapshot();
  });
});
