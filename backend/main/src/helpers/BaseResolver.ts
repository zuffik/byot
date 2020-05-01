import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { List, Role, MediaList } from '../graphql/ts/types';
import { JwtUserType } from '../auth/decorators/jwt-user.decorator';

export abstract class BaseResolver {
  protected returnOrBail<T = any>(entity: T): T {
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  protected createList<L extends List | MediaList>([entries, totalCount]: [
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

  protected async checkOwnership(
    ownerId: string | Promise<{ id: string }>,
    user: JwtUserType,
  ) {
    if (
      user.role !== Role.ADMIN &&
      (ownerId instanceof Promise
        ? (await ownerId).id !== user.id
        : ownerId !== user.id)
    ) {
      throw new ForbiddenException();
    }
  }
}
