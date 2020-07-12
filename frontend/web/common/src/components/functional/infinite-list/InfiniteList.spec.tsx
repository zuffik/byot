import * as React from 'react';
import {InfiniteList} from './InfiniteList';
import {act, render} from '@testing-library/react';
import {ResourceState} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import * as _ from 'lodash';

type DTO = {
  id: string;
  label: string;
  address: {
    street: string;
    city: string;
  };
};

const dto: DTO = {
  id: 'id',
  label: 'label',
  address: {
    street: 'street',
    city: 'city',
  },
};

type Props = {next: () => void; hasMore: boolean; loader: React.ReactNode};
jest.mock('react-infinite-scroll-component', () => {
  const React = require('react');
  return (p: Props & any) => {
    const props: Record<string, string> = Object.assign(
      {},
      ...Object.keys(p).map(k => ({['data-' + k.toLowerCase()]: (p as any)[k]?.toString()}))
    );
    const {next, hasMore} = p;
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (!ref?.current) return;
      const listener = () => hasMore && next();
      (ref.current as HTMLDivElement).addEventListener('triggerNext', listener);
      return () => (ref.current as HTMLDivElement).removeEventListener('triggerNext', listener);
    }, [next, hasMore, ref]);
    return (
      <>
        <div data-testid="infinite-scroll" ref={ref} {...props}>
          {p.children}
        </div>
        {p.loader}
      </>
    );
  };
});

describe('<InfiniteList/>', () => {
  it('should not fetch more if already has enough', () => {
    const resource: IterableResource<DTO> = new IterableResource<DTO>(_.times(10, () => dto));
    resource.totalCount = 5;
    const next = jest.fn();
    const {queryByTestId} = render(<InfiniteList resource={resource} next={next} />);
    const scroll = queryByTestId('infinite-scroll');
    expect(scroll).not.toBeNull();
    expect(scroll!.dataset['hasMore'.toLowerCase()]).toEqual(false.toString());
    act(() => {
      scroll!.dispatchEvent(new Event('triggerNext'));
    });
    expect(next).not.toBeCalled();
  });

  it('should fetch more if has more', () => {
    const resource: IterableResource<DTO> = new IterableResource<DTO>(_.times(10, () => dto));
    resource.totalCount = 15;
    const next = jest.fn();
    const {queryByTestId} = render(<InfiniteList resource={resource} next={next} />);
    const scroll = queryByTestId('infinite-scroll');
    expect(scroll).not.toBeNull();
    expect(scroll!.dataset['hasMore'.toLowerCase()]).toEqual(true.toString());
    act(() => {
      scroll!.dispatchEvent(new Event('triggerNext'));
    });
    expect(next).toBeCalled();
  });

  it('should fetch more if has more and display loader', () => {
    const resource: IterableResource<DTO> = new IterableResource<DTO>(_.times(10, () => dto));
    resource.totalCount = 15;
    const next = jest.fn();
    const {container, queryByTestId, rerender} = render(
      <InfiniteList resource={resource} next={next} loader={<div data-testid="loader" />} />
    );
    const scroll = queryByTestId('infinite-scroll');
    expect(scroll).not.toBeNull();
    expect(scroll!.dataset['hasMore'.toLowerCase()]).toEqual(true.toString());
    act(() => {
      scroll!.dispatchEvent(new Event('triggerNext'));
    });
    expect(next).toBeCalled();
    resource.state = ResourceState.LOADING;
    rerender(<InfiniteList resource={resource} next={next} loader={<div data-testid="loader" />} />);
    expect(queryByTestId('loader')).not.toBeNull();
  });

  it('should fetch more if has more and display as many skeletons as missing elements', () => {
    const items = 10;
    const resource: IterableResource<DTO> = new IterableResource<DTO>(_.times(items, () => dto));
    resource.totalCount = 15;
    const next = jest.fn();
    const {queryByTestId, queryAllByTestId, rerender} = render(
      <InfiniteList step={10} resource={resource} next={next} skeleton={<div data-testid="skeleton" />} />
    );
    const scroll = queryByTestId('infinite-scroll');
    expect(scroll).not.toBeNull();
    expect(scroll!.dataset['hasMore'.toLowerCase()]).toEqual(true.toString());
    act(() => {
      scroll!.dispatchEvent(new Event('triggerNext'));
    });
    expect(next).toBeCalled();
    resource.state = ResourceState.LOADING;
    rerender(
      <InfiniteList step={10} resource={resource} next={next} skeleton={<div data-testid="skeleton" />} />
    );
    expect(queryAllByTestId('skeleton')).toHaveLength(resource.totalCount - items);
  });

  it('should fetch more if has more and display as many skeletons as the step value', () => {
    const items = 10;
    const resource: IterableResource<DTO> = new IterableResource<DTO>(_.times(items, () => dto));
    resource.totalCount = 15;
    const next = jest.fn();
    const {queryByTestId, queryAllByTestId, rerender} = render(
      <InfiniteList step={1} resource={resource} next={next} skeleton={<div data-testid="skeleton" />} />
    );
    const scroll = queryByTestId('infinite-scroll');
    expect(scroll).not.toBeNull();
    expect(scroll!.dataset['hasMore'.toLowerCase()]).toEqual(true.toString());
    act(() => {
      scroll!.dispatchEvent(new Event('triggerNext'));
    });
    expect(next).toBeCalled();
    resource.state = ResourceState.LOADING;
    rerender(
      <InfiniteList step={1} resource={resource} next={next} skeleton={<div data-testid="skeleton" />} />
    );
    expect(queryAllByTestId('skeleton')).toHaveLength(1);
  });
});
