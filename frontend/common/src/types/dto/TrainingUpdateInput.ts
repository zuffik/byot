import {ITrainingUpdateInput} from '../interfaces/ITrainingUpdateInput';
import {ITrainingMediaInput} from '../interfaces/ITrainingMediaInput';

export class TrainingUpdateInput implements ITrainingUpdateInput {
  public label: string;
  public media: ITrainingMediaInput[];

  constructor({label = '', media = []}: Partial<ITrainingUpdateInput> = {}) {
    this.label = label;
    this.media = media;
  }
}
