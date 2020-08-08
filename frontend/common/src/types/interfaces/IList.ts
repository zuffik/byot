import {
  Media,
  MediaList,
  Token,
  TokenList,
  Training,
  TrainingList,
  TrainingSet,
  TrainingSetList,
  User,
  UserList,
} from '@byot/common/graphql/ts/types';
import {IListMeta} from './IListMeta';

export type ListEntity = Media | Token | Training | TrainingSet | User;

export type IList<T extends ListEntity> = Omit<
  MediaList & TokenList & TrainingList & TrainingSetList & UserList,
  'entries'
> & {
  meta: IListMeta;
  entries: T[];
};
