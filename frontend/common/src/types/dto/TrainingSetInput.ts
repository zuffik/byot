import {ITrainingSetInput} from '../interfaces/ITrainingSetInput';

export class TrainingSetInput implements ITrainingSetInput {
  public label: string;

  constructor({label = ''}: Partial<ITrainingSetInput> = {}) {
    this.label = label;
  }
}
