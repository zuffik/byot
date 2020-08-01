import {MediaList, TokenList, TrainingList, TrainingSetList, UserList} from '@byot/common/graphql/ts/types';
import {Media, Token, Training, TrainingSet, User} from '@byot/common/graphql/ts/types';
import {IListMeta} from './IListMeta';

export type ListEntity = Media | Token | Training | TrainingSet | User;

export interface IList<T extends ListEntity>
  extends MediaList,
    TokenList,
    TrainingList,
    TrainingSetList,
    UserList {
  meta: IListMeta;
  entries: T[];
}
