import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserLogin, UserRegister } from '../graphql/ts/types';
import { Auth } from './auth.entity';
import { Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
  }

  @Mutation('userRegister')
  public async userRegister(@Args('user') user: UserRegister): Promise<Auth> {
    return await this.authService.createUser(user);
  }

  @Mutation('userLogin')
  public async userLogin(@Args('user') user: UserLogin): Promise<Auth> {
    return await this.authService.login(user.userNameOrEmail, user.password);
  }
}
