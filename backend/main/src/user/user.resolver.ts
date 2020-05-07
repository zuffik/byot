import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AuthName,
  AuthNameCheck,
  AuthNameCheckResult,
  FulltextFilter,
  Role,
  TokenType,
  User as IUser,
  UserList,
  UserUpdateInput,
} from '../graphql/ts/types';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthRoles } from '../auth/decorators/auth-roles.decorator';
import { JwtUser, JwtUserType } from '../auth/decorators/jwt-user.decorator';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/jwt/auth.guard';
import { BaseResolver } from '../helpers/BaseResolver';
import * as _ from 'lodash';
import { TokenService } from './token/token.service';
import { Token } from './token/token.entity';

@Resolver('User')
export class UserResolver extends BaseResolver {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {
    super();
  }

  @Query('allUsers')
  @AuthRoles(Role.ADMIN)
  public async allUsers(
    @Args('filter') filter?: FulltextFilter,
  ): Promise<UserList> {
    const [entries, totalCount] = await this.userService.findAndCount(filter);
    return {
      meta: {
        totalCount,
      },
      entries,
    };
  }

  @Query('user')
  @UseGuards(AuthGuard)
  public async user(
    @Args('id') id: string,
    @JwtUser() user?: JwtUserType,
  ): Promise<IUser> {
    if (id !== user.id && user.role !== Role.ADMIN) {
      throw new NotFoundException();
    }
    return this.userService.findById(id);
  }

  @Query('me')
  @UseGuards(AuthGuard)
  public async me(@JwtUser() user?: JwtUserType): Promise<IUser> {
    return this.returnOrBail(await this.userService.findById(user.id));
  }

  @Mutation('userUpdate')
  @UseGuards(AuthGuard)
  public async userUpdate(
    @Args('id') id: string,
    @Args('user') user: UserUpdateInput,
    @JwtUser() current?: JwtUserType,
  ): Promise<IUser> {
    if (current.id !== id && current.role !== Role.ADMIN) {
      throw new ForbiddenException();
    }
    delete user.password;
    delete user.passwordRepeat;
    return this.returnOrBail(await this.userService.update(id, user));
  }

  @ResolveField('emailValidated')
  public async resolveEmailValidated(@Parent() user: User): Promise<boolean> {
    return !_.find(
      await user.tokens,
      (token) => token.tokenType === TokenType.EMAIL_CONFIRMATION,
    );
  }

  @Mutation('userConfirmEmail')
  public async userConfirmEmail(@Args('token') token: string): Promise<Token> {
    const t = await this.tokenService.resolve(token);
    if (!t) {
      throw new BadRequestException();
    }
    return t;
  }

  @Query('checkUserAuthName')
  public async checkUserAuthName(
    @Args('check') check: AuthNameCheck,
  ): Promise<AuthNameCheckResult> {
    return {
      available: !(await {
        [AuthName.USER_NAME]: (authName: string) =>
          this.userService.checkUserNameExists(authName),
        [AuthName.EMAIL]: (authName: string) =>
          this.userService.checkEmailExists(authName),
      }[check.type](check.name)),
    };
  }
}
