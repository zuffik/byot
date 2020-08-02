import * as React from 'react';
import {ControlPanelTitle} from '../../control-panel/base/ControlPanelTitle/ControlPanelTitle';
import {EmptyListInfo} from '@byot-frontend/web-common/src/components/elementary/complement/EmptyListInfo';
import {TrainingList} from '../training/TrainingList';
import {TrainingCreateListItem} from '../training/TrainingCreateListItem';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';

interface Props {
  trainingSet?: ITrainingSet;
}

export const TrainingSetDetailContent: React.FC<Props> = (props: Props) => {
  return (
    <>
      <ControlPanelTitle>{props.trainingSet?.label}</ControlPanelTitle>
      {props.trainingSet?.trainings.meta.totalCount === 0 ? (
        <EmptyListInfo />
      ) : (
        <TrainingList items={props.trainingSet?.trainings.entries || []}>
          <TrainingCreateListItem />
        </TrainingList>
      )}
    </>
  );
};
