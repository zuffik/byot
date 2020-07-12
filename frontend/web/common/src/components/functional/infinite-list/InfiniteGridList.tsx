import * as React from 'react';
import {InfiniteList, InfiniteListProps} from './InfiniteList';
import {GridProps, Grid} from '@material-ui/core';

interface Props<T> extends InfiniteListProps<T> {
  GridProps?: GridProps;
}

export const InfiniteGridList = <T extends any>(props: Props<T>) => {
  const [className, setClassName] = React.useState('');
  const ref = React.useCallback((node: HTMLDivElement) => setClassName(node.className), [props.GridProps]);
  return (
    <>
      <div style={{display: 'none'}}>
        <Grid ref={ref} {...props.GridProps} />
      </div>
      <InfiniteList {...props} className={className} />
    </>
  );
};
