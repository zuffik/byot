import * as React from 'react';
import {Typography} from '@material-ui/core';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {TrainingSetListItemImagePlaceholder} from './TrainingSetListItemImagePlaceholder';
import {DateTimeTypography} from '../../elements/typography/DateTimeTypography';
import {TripleComboItem} from '../../elements/list-items/TripleComboItem';
import {Router} from '../../../router/Router';

interface Props {
  trainingSet: ITrainingSet;
}

export const TrainingSetListItem: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  const created = moment(props.trainingSet.createdAt.iso);
  return (
    <TripleComboItem
      data-testid="training-set-list-item"
      imagePlaceholder={<TrainingSetListItemImagePlaceholder />}
      image={props.trainingSet.trainings.entries[0]?.media?.entries?.[0]?.source?.thumbnail}
      singleLine
      title={props.trainingSet.label}
      button
      component={Link}
      to={Router.training.trainingSet.detail.URI({trainingSetId: props.trainingSet.id})}
      description={
        <>
          <Typography variant="body2">
            {props.trainingSet.trainings.meta.totalCount}{' '}
            {t('training', {count: props.trainingSet.trainings.meta.totalCount})}
          </Typography>
          <DateTimeTypography>{created.fromNow()}</DateTimeTypography>
        </>
      }
    />
  );
};
