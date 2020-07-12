import {ITrainingSet} from '../interfaces/ITrainingSet';
import {IDateTime} from '../interfaces/IDateTime';
import {IUser} from '../interfaces/IUser';
import {IList} from '../interfaces/IList';
import {ITraining} from '../interfaces/ITraining';
import {User} from './User';
import {DateTime} from './DateTime';
import {List} from './List';

export class TrainingSet implements ITrainingSet {
  public createdAt: IDateTime;
  public id: string;
  public label: string;
  public owner: IUser;
  public trainings: IList<ITraining>;
  public updatedAt?: IDateTime;

  constructor({createdAt, id, label, owner, trainings, updatedAt}: ITrainingSet) {
    this.createdAt = createdAt instanceof DateTime ? createdAt : new DateTime(createdAt);
    this.updatedAt = updatedAt && updatedAt instanceof DateTime ? updatedAt : new DateTime(updatedAt);
    this.id = id;
    this.label = label;
    this.owner = owner instanceof User ? owner : new User(owner);
    this.trainings = trainings instanceof List ? trainings : new List(trainings);
  }
}
