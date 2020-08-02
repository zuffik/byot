import * as React from 'react';
import {Grid} from '@material-ui/core';
import {ControlPanelTitleSkeleton} from '../../control-panel/base/ControlPanelTitle/ControlPanelTitleSkeleton';
import * as _ from 'lodash';
import {TrainingSetListItemSkeleton} from './TrainingSetListItemSkeleton';
import {EditDeleteControlsSkeleton} from '../../elements/controls/EditDeleteControlsSkeleton';

interface Props {}

export const TrainingSetDetailSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <>
      <EditDeleteControlsSkeleton />
      <ControlPanelTitleSkeleton />
      <Grid container spacing={2}>
        {_.times(12, i => (
          <Grid key={i} item xs={12} md={6}>
            <TrainingSetListItemSkeleton />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
