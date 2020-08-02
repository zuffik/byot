import * as React from 'react';
import {ControlPanelMainContent} from '../control-panel/base/ControlPanelMainContent';
import {ControlPanelTitle} from '../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {useTranslation} from 'react-i18next';
import {TrainingSetForm} from '../training/set/TrainingSetForm';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {ITrainingSetInput} from '@byot-frontend/common/src/types/interfaces/ITrainingSetInput';
import {WebAppState} from '../../redux/WebAppState';
import {TrainingSetFetch} from '@byot-frontend/common/src/redux/process/training-set/TrainingSetFetch';
import {useParams} from 'react-router-dom';
import {Router} from '../../router/Router';
import {ControlPanelTitleSkeleton} from '../control-panel/base/ControlPanelTitle/ControlPanelTitleSkeleton';
import {TrainingSetUpdate} from '../../redux/process/training-set/TrainingSetUpdate';

interface Props {}

export const TrainingSetEditPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {trainingSetId} = useParams<typeof Router.training.trainingSet.detail.params>();
  const onSave = (trainingSet: ITrainingSetInput) =>
    dispatch(ProcessActionExtractor.dispatch(TrainingSetUpdate, {trainingSet, id: trainingSetId}));
  React.useEffect(() => {
    dispatch(ProcessActionExtractor.dispatch(TrainingSetFetch, {id: trainingSetId}));
  }, [dispatch, trainingSetId]);
  const trainingSet = useSelector((state: WebAppState) => state.trainingSetDetail);
  const isLoading = useSelector((state: WebAppState) => state.is.savingTrainingSet);
  return (
    <ControlPanelMainContent>
      {!trainingSet.hasData || trainingSet.isProcessing ? (
        <ControlPanelTitleSkeleton />
      ) : (
        <>
          <ControlPanelTitle>{t('Edit training set')}</ControlPanelTitle>
          <TrainingSetForm onSave={onSave} trainingSet={trainingSet.data!} isLoading={isLoading} />
        </>
      )}
    </ControlPanelMainContent>
  );
};
