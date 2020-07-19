import {List} from '@byot-frontend/common/src/types/dto/List';
import {ListEntity} from '@byot-frontend/common/src/types/interfaces/IList';

export const list = <T extends ListEntity>(entries: T[], totalCount: number = 0): IList<T> =>
  new List<T>(entries, {totalCount: Math.max(totalCount, entries.length)});
