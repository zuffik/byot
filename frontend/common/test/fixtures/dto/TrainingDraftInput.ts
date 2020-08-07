import {mocker} from '../Mocker';
import * as _ from 'lodash';
import {ITrainingDraftInput} from '../../../src/types/interfaces/ITrainingDraftInput';
import {TrainingDraftInput} from '../../../src/types/dto/TrainingDraftInput';
import {trainingMediaInput} from './TrainingMediaInput';

export const trainingDraftInput = ({}: {} = {}): ITrainingDraftInput =>
  new TrainingDraftInput({
    idTrainingSet: mocker.guid(),
    label: mocker.sentence(),
    media: _.times(mocker.integer({min: 1, max: 10}), () => trainingMediaInput()),
  });
