import { AuthGuard } from './auth.guard';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRolesMetaDataKey } from '../decorators/auth-roles.decorator';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthRolesGuard extends AuthGuard {
  constructor(
    @Inject(ConfigService)
    cfg: ConfigService,
    @Inject(UserService)
    users: UserService,
    private reflector: Reflector,
  ) {
    super(cfg, users);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context);
    if (!isAuth) {
      return false;
    }
    const roles = this.reflector.get<string[]>(
      AuthRolesMetaDataKey,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = this.getRequest(context);
    const user = request.user;
    return roles.includes(user.role);
  }
}
