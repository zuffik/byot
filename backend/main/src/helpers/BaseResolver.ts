import { NotFoundException } from '@nestjs/common';
import { List } from '../graphql/ts/types';

export abstract class BaseResolver {
  protected returnOrBail<T = any>(entity: T): T {
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  protected createList<L extends List>([entries, totalCount]: [
    any[],
    number,
  ]): L {
    return {
      entries,
      meta: {
        totalCount,
      },
    } as L;
  }
}
