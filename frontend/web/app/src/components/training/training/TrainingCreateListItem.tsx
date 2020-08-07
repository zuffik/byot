import * as React from 'react';
import {TripleComboItem} from '../../elements/list-items/TripleComboItem';
import {useTranslation} from 'react-i18next';
import {Grid, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Router} from '../../../router/Router';
import {TrainingCreateListItemPlaceholder} from './TrainingCreateListItemPlaceholder';

interface Props {
  trainingSetId: string;
}

export const TrainingCreateListItem: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  return (
    <Grid item xs={12} md={6}>
      <TripleComboItem
        button
        component={Link}
        to={Router.trainingSet.training.create.URI({trainingSetId: props.trainingSetId})}
        alignItems="center"
        image={<TrainingCreateListItemPlaceholder />}
        data-testid="app-components-training-create"
        primary={
          <Typography color="primary" variant="h6">
            {t('Create training')}
          </Typography>
        }
      />
    </Grid>
  );
};
