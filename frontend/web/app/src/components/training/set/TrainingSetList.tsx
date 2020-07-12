import * as React from 'react';
import {Grid} from '@material-ui/core';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {InfiniteGridList} from '@byot-frontend/web-common/src/components/functional/infinite-list/InfiniteGridList';
import {TrainingSetListItemSkeleton} from './TrainingSetListItemSkeleton';
import {TrainingSetListItem} from './TrainingSetListItem';

interface Props {
  items: IterableResource<ITrainingSet>;
  onLoadMore: (offset: number, limit: number) => void;
}

export const TrainingSetList: React.FC<Props> = (props: Props) => {
  return (
    <InfiniteGridList
      resource={props.items}
      GridProps={{container: true, spacing: 2}}
      next={props.onLoadMore}
      skeleton={
        <Grid item xs={12} md={6}>
          <TrainingSetListItemSkeleton />
        </Grid>
      }>
      {props.items.data.map(item => (
        <Grid item xs={12} md={6} key={item.id}>
          <TrainingSetListItem trainingSet={item} />
        </Grid>
      ))}
    </InfiniteGridList>
  );
};
