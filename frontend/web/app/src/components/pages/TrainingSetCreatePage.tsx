import * as React from 'react';
import {ControlPanelMainContent} from '../control-panel/base/ControlPanelMainContent';
import {ControlPanelTitle} from '../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {useTranslation} from 'react-i18next';
import {TrainingSetForm} from '../training/set/TrainingSetForm';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {ITrainingSetInput} from '@byot-frontend/common/src/types/interfaces/ITrainingSetInput';
import {TrainingSetCreate} from '../../redux/process/training-set/TrainingSetCreate';
import {WebAppState} from '../../redux/WebAppState';

interface Props {}

export const TrainingSetCreatePage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const onSave = (trainingSet: ITrainingSetInput) =>
    dispatch(ProcessActionExtractor.dispatch(TrainingSetCreate, trainingSet));
  const isLoading = useSelector((state: WebAppState) => state.is.processingTrainingSet);
  return (
    <ControlPanelMainContent>
      <ControlPanelTitle>{t('Create training set')}</ControlPanelTitle>
      <TrainingSetForm onSave={onSave} isLoading={isLoading} />
    </ControlPanelMainContent>
  );
};
