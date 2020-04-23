import { AuthGuard } from './auth.guard';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { AuthRolesMetaDataKey } from '../decorators/auth-roles.decorator';

@Injectable()
export class AuthRolesGuard extends AuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context);
    if (!isAuth) {
      return false;
    }
    const roles = this.reflector.get<string[]>(AuthRolesMetaDataKey, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = this.getRequest(context);
    const user = request.user;
    return roles.includes(user.role);
  }
}
