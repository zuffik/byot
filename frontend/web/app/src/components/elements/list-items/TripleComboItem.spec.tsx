import * as React from 'react';
import {render} from '@testing-library/react';
import {TripleComboItem} from './TripleComboItem';

describe('<TripleComboItem/>', () => {
  it('should render with different props', () => {
    expect(
      render(<TripleComboItem primary="Something" description="description" />).container
    ).toMatchSnapshot();
    expect(
      render(<TripleComboItem primary="Something" description="description" transparent />).container
    ).toMatchSnapshot();
    expect(render(<TripleComboItem primary="Something" singleLine />).container).toMatchSnapshot();
    expect(
      render(<TripleComboItem primary="Something" description="description" image="image" />).container
    ).toMatchSnapshot();
    expect(
      render(<TripleComboItem primary="Something" description="description" imagePlaceholder />).container
    ).toMatchSnapshot();
  });
});
