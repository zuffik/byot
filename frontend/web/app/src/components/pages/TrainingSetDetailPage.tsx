import * as React from 'react';
import {Grid} from '@material-ui/core';
import {ControlPanelMainContent} from '../control-panel/base/ControlPanelMainContent';
import {ControlPanelTitle} from '../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Router} from '../../router/Router';
import {WebAppState} from '../../redux/WebAppState';
import {ControlPanelTitleSkeleton} from '../control-panel/base/ControlPanelTitle/ControlPanelTitleSkeleton';
import * as _ from 'lodash';
import {TrainingSetListItemSkeleton} from '../training/set/TrainingSetListItemSkeleton';
import {TrainingList} from '../training/training/TrainingList';
import {TrainingSetFetch} from '@byot-frontend/common/src/redux/process/training-set/TrainingSetFetch';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {EmptyListInfo} from '@byot-frontend/web-common/src/components/elementary/complement/EmptyListInfo';

interface Props {}

export const TrainingSetDetailPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {trainingSetId} = useParams<typeof Router.training.trainingSet.detail.params>();
  React.useEffect(() => {
    dispatch(ProcessActionExtractor.dispatch(TrainingSetFetch, {id: trainingSetId}));
  }, [trainingSetId, dispatch]);
  const trainingSet = useSelector((state: WebAppState) => state.trainingSetDetail);

  return (
    <ControlPanelMainContent>
      {trainingSet.isProcessing || !trainingSet.hasData ? (
        <>
          <ControlPanelTitleSkeleton />
          <Grid container spacing={2}>
            {_.times(12, i => (
              <Grid key={i} item xs={12} md={6}>
                <TrainingSetListItemSkeleton />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <ControlPanelTitle>{trainingSet.data?.label}</ControlPanelTitle>
          {trainingSet.data?.trainings.meta.totalCount === 0 ? (
            <EmptyListInfo />
          ) : (
            <TrainingList items={trainingSet.data?.trainings.entries || []} />
          )}
        </>
      )}
    </ControlPanelMainContent>
  );
};
