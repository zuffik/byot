import {Training} from '@byot-frontend/common/src/types/dto/Training';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';
import {mocker} from '../../helpers/Mocker';
import {dateTime} from './DateTime';
import {trainingSet} from './TrainingSet';
import {IUser} from '@byot-frontend/common/src/types/interfaces/IUser';
import {user} from './User';
import {list} from './List';
import * as _ from 'lodash';
import {media} from './Media';

export const training = ({
  withTrainingSet = true,
  owner,
}: {withTrainingSet?: boolean; owner?: IUser} = {}): ITraining =>
  new Training({
    id: mocker.guid(),
    createdAt: dateTime(),
    updatedAt: dateTime(),
    label: mocker.sentence(),
    trainingSet: withTrainingSet && trainingSet({withTrainings: false}),
    owner: owner || user(),
    media: list(_.times(mocker.integer({min: 2, max: 20}), () => media())),
  });
