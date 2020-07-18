import {IListMeta} from '../interfaces/IListMeta';
import {IList, ListEntity} from '../interfaces/IList';

export class List<T extends ListEntity> implements IList<T> {
  public entries: T[];
  public meta: IListMeta;
  constructor(list?: IList<T>);
  constructor(entries: T[], meta: IListMeta);
  constructor(entries?: T[] | IList<T>, meta?: IListMeta) {
    if (Array.isArray(entries)) {
      this.entries = entries;
      this.meta = meta!;
    } else {
      this.entries = entries?.entries || [];
      this.meta = entries?.meta || {totalCount: 0};
    }
  }
}
