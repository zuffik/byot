import { NotFoundException } from '@nestjs/common';

export abstract class BaseResolver {
  protected returnOrBail(entity: any): any {
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}
