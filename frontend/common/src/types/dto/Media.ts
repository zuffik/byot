import {IMedia} from '../interfaces/IMedia';
import {ISource} from '../interfaces/ISource';
import {IDateTime} from '../interfaces/IDateTime';
import {DateTime} from './DateTime';
import {Source} from './Source';

export class Media implements IMedia {
  public id: string;
  public label: string;
  public source: ISource;
  public updatedAt: IDateTime;
  public createdAt?: IDateTime;

  constructor({id, label, source, updatedAt, createdAt}: IMedia) {
    this.createdAt = createdAt instanceof DateTime ? createdAt : new DateTime(createdAt);
    this.updatedAt = updatedAt && updatedAt instanceof DateTime ? updatedAt : new DateTime(updatedAt);
    this.id = id;
    this.label = label;
    this.source = source instanceof Source ? source : new Source(source);
  }
}
