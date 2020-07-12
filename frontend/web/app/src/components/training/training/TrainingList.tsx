import * as React from 'react';
import {Grid} from '@material-ui/core';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';
import {InfiniteGridList} from '@byot-frontend/web-common/src/components/functional/infinite-list/InfiniteGridList';
import {TrainingListItemSkeleton} from './TrainingListItemSkeleton';
import {TrainingListItem} from './TrainingListItem';

interface Props {
  items: IterableResource<ITraining>;
  onLoadMore: (offset: number, limit: number) => void;
}

export const TrainingList: React.FC<Props> = (props: Props) => {
  return (
    <InfiniteGridList
      resource={props.items}
      GridProps={{container: true, spacing: 2}}
      next={props.onLoadMore}
      skeleton={
        <Grid item xs={12} md={6}>
          <TrainingListItemSkeleton />
        </Grid>
      }>
      {props.items.data.map(item => (
        <Grid item xs={12} md={6} key={item.id}>
          <TrainingListItem training={item} />
        </Grid>
      ))}
    </InfiniteGridList>
  );
};
