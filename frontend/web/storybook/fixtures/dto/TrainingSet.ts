import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {TrainingSet} from '@byot-frontend/common/src/types/dto/TrainingSet';
import {mocker} from '../../helpers/Mocker';
import {dateTime} from './DateTime';
import {list} from './List';
import * as _ from 'lodash';
import {training} from './Training';
import {user} from './User';

export const trainingSet = ({withTrainings = true}: {withTrainings?: boolean} = {}): ITrainingSet => {
  const owner = user();
  return new TrainingSet({
    id: mocker.guid(),
    createdAt: dateTime(),
    updatedAt: dateTime(),
    label: mocker.sentence(),
    trainings:
      withTrainings &&
      list(
        _.times(mocker.integer({min: 2, max: 20}), () => training({withTrainingSet: false, owner})),
        mocker.integer({
          min: 10,
          max: 200,
        })
      ),
    owner,
  });
};
