import * as React from 'react';
import {ControlPanelMainContent} from '../control-panel/base/ControlPanelMainContent';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Router} from '../../router/Router';
import {WebAppState} from '../../redux/WebAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {TrainingSetDetailSkeleton} from '../training/set/TrainingSetDetailSkeleton';
import {TrainingSetDetailContent} from '../training/set/TrainingSetDetailContent';
import {TrainingSetRemove} from '../../redux/process/training-set/TrainingSetRemove';
import {TrainingSetFetch} from '../../redux/process/training-set/TrainingSetFetch';

interface Props {}

export const TrainingSetDetailPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {trainingSetId} = useParams<typeof Router.training.trainingSet.detail.params>();
  React.useEffect(() => {
    dispatch(ProcessActionExtractor.dispatch(TrainingSetFetch, {id: trainingSetId}));
  }, [trainingSetId, dispatch]);
  const trainingSet = useSelector((state: WebAppState) => state.trainingSetDetail);
  const onRemove = () => dispatch(ProcessActionExtractor.dispatch(TrainingSetRemove, {id: trainingSetId}));
  const isRemoving = useSelector((state: WebAppState) => state.is.processingTrainingSet);

  return (
    <ControlPanelMainContent>
      {trainingSet.isProcessing || !trainingSet.hasData ? (
        <TrainingSetDetailSkeleton />
      ) : (
        <TrainingSetDetailContent
          trainingSet={trainingSet.data}
          onRemove={onRemove}
          isRemoving={isRemoving}
        />
      )}
    </ControlPanelMainContent>
  );
};
