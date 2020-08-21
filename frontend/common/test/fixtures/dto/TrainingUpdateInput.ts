import {mocker} from '../Mocker';
import * as _ from 'lodash';
import {trainingMediaInput} from './TrainingMediaInput';
import {ITrainingUpdateInput} from '../../../src/types/interfaces/ITrainingUpdateInput';
import {TrainingUpdateInput} from '../../../src/types/dto/TrainingUpdateInput';

export const trainingUpdateInput = ({}: {} = {}): ITrainingUpdateInput =>
  new TrainingUpdateInput({
    label: mocker.sentence(),
    media: _.times(10, () => trainingMediaInput()),
  });
