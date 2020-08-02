import * as React from 'react';
import {Grid} from '@material-ui/core';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';
import {TrainingListItem} from './TrainingListItem';

interface Props {
  items: ITraining[];
}

export const TrainingList: React.FC<Props> = (props: Props) => {
  return (
    <Grid container spacing={2}>
      {props.items.map(item => (
        <Grid item xs={12} md={6} key={item.id}>
          <TrainingListItem training={item} />
        </Grid>
      ))}
    </Grid>
  );
};
