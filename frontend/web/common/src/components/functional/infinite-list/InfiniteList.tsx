import * as React from 'react';
import * as _ from 'lodash';
import InfiniteScroll, {Props as InfiniteScrollProps} from 'react-infinite-scroll-component';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';

export interface InfiniteListProps<T>
  extends Omit<InfiniteScrollProps, 'dataLength' | 'hasMore' | 'next' | 'loader' | 'children'> {
  resource: IterableResource<T>;
  step?: number;
  next: (offset: number, limit: number) => void;
  loader?: React.ReactNode;
  skeleton?: React.ReactNode;
  children?: React.ReactNode;
}

interface Props<T> extends InfiniteListProps<T> {}

export const InfiniteList = <T extends any>(props: Props<T>) => {
  const step = props.step || 6;
  const next = () => {
    props.next(props.resource.data.length, step);
  };
  const missingItems = Math.min(step, props.resource.totalCount - props.resource.data.length);
  return (
    <InfiniteScroll
      dataLength={props.resource.data.length}
      hasMore={props.resource.totalCount > props.resource.data.length}
      next={next}
      hasChildren={false}
      loader={
        (props.skeleton &&
          _.times(missingItems, i => <React.Fragment key={i}>{props.skeleton}</React.Fragment>)) ||
        props.loader || <></>
      }>
      {props.children}
    </InfiniteScroll>
  );
};
