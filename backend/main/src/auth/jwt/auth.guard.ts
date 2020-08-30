import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as md5 from 'md5';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard extends BaseAuthGuard('jwt') {
  constructor(
    @Inject(ConfigService)
    private readonly cfg: ConfigService,
    @Inject(UserService)
    private readonly users: UserService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.cfg.get('node.env') === 'test') {
      const req = this.getRequest(context);
      const auth = req.header('Authorization');
      if (
        auth.toLowerCase().startsWith('bearer') &&
        auth.replace(/^Bearers\s/i, '') === md5(this.cfg.get('app.secret'))
      ) {
        req.user = this.users.findByUsernameOrEmail(
          this.cfg.get('app.test.email'),
        );
        return true;
      }
    }
    return super.canActivate(context);
  }
}
