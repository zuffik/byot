import * as React from 'react';
import {ControlPanelMainContent} from '../control-panel/base/ControlPanelMainContent';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Router} from '../../router/Router';
import {WebAppState} from '../../redux/WebAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {TrainingFetch} from '../../redux/process/training/TrainingFetch';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {MediaProvider} from '../media/form/MediaProvider';
import {ControlPanelTitle} from '../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {TrainingForm} from '../training/training/TrainingForm';
import {TrainingUpdate} from '../../redux/process/training/TrainingUpdate';
import {useTranslation} from 'react-i18next';
import {TrainingFormSkeleton} from '../training/training/TrainingFormSkeleton';
import {ITrainingUpdateInput} from '@byot-frontend/common/src/types/interfaces/ITrainingUpdateInput';

interface Props {}

export const TrainingEditPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {trainingId} = useParams<typeof Router.training.detail.params>();
  React.useEffect(() => {
    dispatch(ProcessActionExtractor.dispatch(TrainingFetch, {id: trainingId}));
  }, [trainingId, dispatch]);
  const training = useSelector((state: WebAppState) => state.trainingDetail);
  const {t} = useTranslation();
  const [
    Autocomplete,
  ] = React.useState(() => ({handleMediaFound}: {handleMediaFound: (media: IMedia) => void}) => (
    <MediaProvider onSelect={handleMediaFound} />
  ));
  const onSave = (training: ITrainingUpdateInput) =>
    dispatch(ProcessActionExtractor.dispatch(TrainingUpdate, {training, id: trainingId}));
  const isLoading = useSelector((state: WebAppState) => state.is.processingTraining);
  return (
    <ControlPanelMainContent>
      <ControlPanelTitle>{t('Edit training')}</ControlPanelTitle>
      {!training.hasData || training.isProcessing ? (
        <TrainingFormSkeleton />
      ) : (
        <TrainingForm
          training={training.data!}
          onSave={onSave}
          isLoading={isLoading}
          MediaProviderComponent={Autocomplete}
        />
      )}
    </ControlPanelMainContent>
  );
};
