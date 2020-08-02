import * as React from 'react';
import {Grid} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';

interface Props {}

export const EditDeleteControlsSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <Grid container spacing={1} justify="flex-end">
      <Grid item>
        <Skeleton variant="circle" height={40} width={40} />
      </Grid>
      <Grid item>
        <Skeleton variant="circle" height={40} width={40} />
      </Grid>
    </Grid>
  );
};
