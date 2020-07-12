import * as React from 'react';
import {makeStyles, Theme, Typography} from '@material-ui/core';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';
import {useTranslation} from 'react-i18next';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import {TrainingListItemImagePlaceholder} from './TrainingListItemImagePlaceholder';
import {DateTimeTypography} from '../../elements/typography/DateTimeTypography';
import {TripleComboItem} from '../../elements/TripleComboItem';
import {Router} from '../../../router/Router';

interface Props extends WithStyles<typeof styles> {
  training: ITraining;
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

export const TrainingListItem: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  const created = moment(props.training.createdAt.iso);
  return (
    <TripleComboItem
      imagePlaceholder={<TrainingListItemImagePlaceholder />}
      image={props.training.media?.entries?.[0]?.source?.thumbnail}
      classes={{primaryText: styles.title, textRoot: styles.textRoot}}
      title={props.training.label}
      button
      component={Link}
      to={Router.training.detail.URI({trainingId: props.training.id})}
      description={
        <>
          <Typography variant="body2">
            {props.training.media.meta.totalCount} {t('video', {count: props.training.media.meta.totalCount})}
          </Typography>
          <DateTimeTypography>{created.fromNow()}</DateTimeTypography>
        </>
      }
    />
  );
};
