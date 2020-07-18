import * as React from 'react';
import {Grid} from '@material-ui/core';
import * as _ from 'lodash';
import {TripleComboItemSkeleton} from '../list-items/TripleComboItemSkeleton';

interface Props {
  skeletons?: number;
}

export const TripleComboItemSkeletonList: React.FC<Props> = (props: Props) => {
  return (
    <Grid container spacing={1}>
      {_.times(props.skeletons || 10, () => (
        <Grid item xs={12}>
          <TripleComboItemSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};
