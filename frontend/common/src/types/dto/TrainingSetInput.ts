import {ITrainingSetInput} from '../interfaces/ITrainingSetInput';
import {ITrainingSet} from '../interfaces/ITrainingSet';

export class TrainingSetInput implements ITrainingSetInput {
  public label: string;

  constructor({label = ''}: Partial<ITrainingSetInput | ITrainingSet> = {}) {
    this.label = label;
  }
}
