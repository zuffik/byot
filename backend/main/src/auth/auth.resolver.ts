import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IMutation, IQuery, User as IUser, UserLogin, UserRegister, UserUpdateInput } from '../graphql/ts/types';
import { Auth } from './auth.entity';
import { BadRequestException, Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtUserType } from './decorators/jwt-user.decorator';
import { BaseResolver } from '../helpers/BaseResolver';
import { AuthGuard } from './jwt/auth.guard';
import { AuthUser } from './decorators/auth-user.decorator';

@Resolver('Auth')
export class AuthResolver extends BaseResolver implements Partial<IMutation & IQuery> {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    super();
  }

  @Mutation('userRegister')
  public async userRegister(@Args('user') user: UserRegister): Promise<Auth> {
    return await this.authService.createUser(user);
  }

  @Mutation('userLogin')
  public async userLogin(@Args('user') user: UserLogin): Promise<Auth> {
    const u = await this.authService.login(user.userNameOrEmail, user.password);
    if (!u) {
      throw new UnauthorizedException();
    }
    return u;
  }

  @Mutation('userUpdateMyself')
  @UseGuards(AuthGuard)
  public async userUpdateMyself(input: UserUpdateInput, @AuthUser() user?: JwtUserType): Promise<IUser> {
    if (input.password && input.password !== input.passwordRepeat) {
      throw new BadRequestException('Passwords must match');
    } else {
      delete input.password;
      delete input.passwordRepeat;
    }
    return this.returnOrBail(await this.authService.updateUser(user.id, input));
  }
}
