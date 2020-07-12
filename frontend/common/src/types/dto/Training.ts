import {ITraining} from '../interfaces/ITraining';
import {IList} from '../interfaces/IList';
import {IUser} from '../interfaces/IUser';
import {IDateTime} from '../interfaces/IDateTime';
import {ITrainingSet} from '../interfaces/ITrainingSet';
import {IMedia} from '../interfaces/IMedia';
import {DateTime} from './DateTime';
import {User} from './User';
import {List} from './List';

export class Training implements ITraining {
  public id: string;
  public label: string;
  public media: IList<IMedia>;
  public owner: IUser;
  public trainingSet: ITrainingSet;
  public updatedAt?: IDateTime;
  public createdAt: IDateTime;
  constructor({id, label, media, owner, trainingSet, updatedAt, createdAt}: ITraining) {
    this.createdAt = createdAt instanceof DateTime ? createdAt : new DateTime(createdAt);
    this.updatedAt = updatedAt && updatedAt instanceof DateTime ? updatedAt : new DateTime(updatedAt);
    this.id = id;
    this.label = label;
    this.media = media instanceof List ? media : new List(media);
    this.owner = owner instanceof User ? owner : new User(owner);
    this.trainingSet = trainingSet;
  }
}
