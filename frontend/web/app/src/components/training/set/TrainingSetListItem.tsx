import * as React from 'react';
import {makeStyles, Theme, Typography} from '@material-ui/core';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {useTranslation} from 'react-i18next';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import {TrainingSetListItemImagePlaceholder} from './TrainingSetListItemImagePlaceholder';
import {DateTimeTypography} from '../../elements/typography/DateTimeTypography';
import {TripleComboItem} from '../../elements/TripleComboItem';
import {Router} from '../../../router/Router';

interface Props extends WithStyles<typeof styles> {
  trainingSet: ITrainingSet;
}

const styles = (theme: Theme) => ({
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  textRoot: {
    margin: 0,
  },
});
const useStyles = makeStyles(styles);

export const TrainingSetListItem: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  const created = moment(props.trainingSet.createdAt.iso);
  return (
    <TripleComboItem
      imagePlaceholder={<TrainingSetListItemImagePlaceholder />}
      image={props.trainingSet.trainings.entries[0]?.media?.entries?.[0]?.source?.thumbnail}
      classes={{primaryText: styles.title, textRoot: styles.textRoot}}
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
