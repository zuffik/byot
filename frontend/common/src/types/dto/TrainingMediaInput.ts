import {ITrainingMediaInput} from '../interfaces/ITrainingMediaInput';
import {SourceType} from '../enums/SourceType';

export class TrainingMediaInput implements ITrainingMediaInput {
  public id: string;
  public sourceType: SourceType;
  public label: string;

  constructor({id = '', label = '', sourceType = SourceType.YOUTUBE}: Partial<ITrainingMediaInput> = {}) {
    this.id = id;
    this.label = label;
    this.sourceType = sourceType;
  }
}
