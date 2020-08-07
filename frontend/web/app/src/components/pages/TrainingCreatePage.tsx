import * as React from 'react';
import {ControlPanelMainContent} from '../control-panel/base/ControlPanelMainContent';
import {ControlPanelTitle} from '../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {TrainingForm} from '../training/training/TrainingForm';
import {ITrainingDraftInput} from '@byot-frontend/common/src/types/interfaces/ITrainingDraftInput';
import {MediaProvider} from '../media/form/MediaProvider';
import {Router} from '../../router/Router';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {WebAppState} from '../../redux/WebAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {TrainingCreate} from '../../redux/process/training/TrainingCreate';

interface Props {}

export const TrainingCreatePage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {trainingSetId} = useParams<typeof Router.trainingSet.training.params>();
  const {t} = useTranslation();
  const [
    Autocomplete,
  ] = React.useState(() => ({handleMediaFound}: {handleMediaFound: (media: IMedia) => void}) => (
    <MediaProvider onSelect={handleMediaFound} />
  ));
  const onSave = (training: ITrainingDraftInput) =>
    dispatch(ProcessActionExtractor.dispatch(TrainingCreate, training));
  const isLoading = useSelector((state: WebAppState) => state.is.processingTraining);
  return (
    <ControlPanelMainContent>
      <ControlPanelTitle>{t('Create training')}</ControlPanelTitle>
      <TrainingForm
        trainingSetId={trainingSetId!}
        onSave={onSave}
        isLoading={isLoading}
        MediaProviderComponent={Autocomplete}
      />
    </ControlPanelMainContent>
  );
};
