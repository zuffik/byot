import * as React from 'react';
import {ControlPanelTitle} from '../../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {TrainingList} from '../training/TrainingList';
import {TrainingCreateListItem} from '../training/TrainingCreateListItem';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {EditConfirmDeleteControls} from '../../elements/controls/EditConfirmDeleteControls';
import {Router} from '../../../router/Router';
import {useTranslation} from 'react-i18next';

interface Props {
  trainingSet?: ITrainingSet;
  onRemove: () => void;
  isRemoving?: boolean;
}

export const TrainingSetDetailContent: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();

  return (
    <>
      <EditConfirmDeleteControls
        editUrl={Router.training.trainingSet.edit.URI({trainingSetId: props.trainingSet?.id})}
        onDeleteClick={props.onRemove}
        confirmationText={t('Do you really want to delete this training set?')}
        isRemoving={props.isRemoving}
      />
      <ControlPanelTitle>{props.trainingSet?.label}</ControlPanelTitle>
      <TrainingList items={props.trainingSet?.trainings.entries || []}>
        <TrainingCreateListItem />
      </TrainingList>
    </>
  );
};
