import * as React from 'react';
import {render} from '@testing-library/react';
import {InfiniteGridList} from './InfiniteGridList';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';

describe('<InfiniteGridList/>', () => {
  it('should render', () => {
    const {container} = render(
      <InfiniteGridList next={jest.fn()} resource={new IterableResource<any>([])} />
    );
    expect(container).toMatchSnapshot();
  });
});
