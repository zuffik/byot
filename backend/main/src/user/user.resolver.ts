import { Args, Query, Resolver } from '@nestjs/graphql';
import { Auth, FulltextFilter, IMutation, IQuery, Role, User as IUser, UserList, UserUpdateInput } from '../graphql/ts/types';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthRoles } from '../auth/decorators/auth-roles.decorator';
import { JwtUser, JwtUserType } from '../auth/decorators/jwt-user.decorator';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt/auth.guard';

@Resolver('User')
export class UserResolver implements Partial<IMutation & IQuery> {
  constructor(
    private userService: UserService,
  ) {
  }

  @Query('allUsers')
  @AuthRoles(Role.ADMIN)
  public async allUsers(@Args('filter') filter?: FulltextFilter): Promise<UserList> {
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
  public async user(@Args('id') id: string, @JwtUser() user?: JwtUserType): Promise<IUser> {
    if (id !== user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException();
    }
    return this.userService.findById(id);
  }

  @Query('me')
  @UseGuards(AuthGuard)
  public async me(@JwtUser() user?: JwtUserType): Promise<IUser> {
    return this.userService.findById(user.id);
  }

  public async userUpdate(id: string, user: UserUpdateInput): Promise<IUser> {
    return null as any;
  }

  public async userUpdateMyself(user: UserUpdateInput): Promise<Auth> {
    return null as any;
  }

}
