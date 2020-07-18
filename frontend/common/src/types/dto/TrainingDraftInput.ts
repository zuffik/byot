import {ITrainingDraftInput} from '../interfaces/ITrainingDraftInput';
import {ITrainingMediaInput} from '../interfaces/ITrainingMediaInput';

export class TrainingDraftInput implements ITrainingDraftInput {
  public idTrainingSet: string;
  public label: string;
  public media: ITrainingMediaInput[];

  constructor({idTrainingSet = '', label = '', media = []}: Partial<ITrainingDraftInput> = {}) {
    this.idTrainingSet = idTrainingSet;
    this.label = label;
    this.media = media;
  }
}
