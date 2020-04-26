import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  FulltextFilter,
  IMutation,
  IQuery,
  Role,
  User as IUser,
  UserList,
  UserUpdateInput,
} from '../graphql/ts/types';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthRoles } from '../auth/decorators/auth-roles.decorator';
import { JwtUser, JwtUserType } from '../auth/decorators/jwt-user.decorator';
import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/jwt/auth.guard';
import { BaseResolver } from '../helpers/BaseResolver';

@Resolver('User')
export class UserResolver extends BaseResolver
  implements Partial<IMutation & IQuery> {
  constructor(private userService: UserService) {
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
}
