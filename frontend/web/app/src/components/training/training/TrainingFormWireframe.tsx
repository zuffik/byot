import * as React from 'react';
import {Grid} from '@material-ui/core';

interface Props {
  name?: React.ReactNode;
  mediaList?: React.ReactNode;
  mediaForm?: React.ReactNode;
  button?: React.ReactNode;
}

export const TrainingFormWireframe: React.FC<Props> = (props: Props) => {
  return (
    <Grid container spacing={2} justify="flex-end">
      <Grid item xs={12}>
        {props.name}
      </Grid>
      <Grid item xs={12}>
        {props.mediaList}
      </Grid>
      <Grid item xs={12}>
        {props.mediaForm}
      </Grid>
      <Grid item>{props.button}</Grid>
    </Grid>
  );
};
