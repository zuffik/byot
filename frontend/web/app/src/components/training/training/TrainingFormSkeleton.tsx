import * as React from 'react';
import {Grid} from '@material-ui/core';
import {TrainingFormWireframe} from './TrainingFormWireframe';
import {PatchSkeleton} from '@byot-frontend/web-common/src/components/elementary/patch/PatchSkeleton';
import {TripleComboItemSkeletonList} from '../../list/TripleComboItemSkeletonList';

interface Props {}

export const TrainingFormSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <TrainingFormWireframe
      name={<PatchSkeleton variant="rect" height={56} />}
      mediaList={<TripleComboItemSkeletonList skeletons={5} />}
      mediaForm={
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PatchSkeleton variant="rect" height={56} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PatchSkeleton variant="rect" height={56} />
          </Grid>
        </Grid>
      }
      button={<PatchSkeleton variant="rect" height={120} />}
    />
  );
};
