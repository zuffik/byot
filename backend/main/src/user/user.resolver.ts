import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  Auth,
  FulltextFilter,
  IMutation,
  IQuery,
  User as IUser,
  UserList,
  UserLogin,
  UserRegister,
  UserUpdateInput,
} from '../graphql/ts/types';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver implements Partial<IMutation & IQuery> {
  constructor(
    private userService: UserService,
  ) {
  }

  @Query()
  public async allUsers(@Args('filter') filter?: FulltextFilter): Promise<UserList> {
    const [entries, totalCount] = await this.userService.findAndCount(filter);
    return {
      meta: {
        totalCount,
      },
      entries,
    };
  }

  public async user(id: string): Promise<IUser> {
    return null as any;
  }

  public async userLogin(user: UserLogin): Promise<Auth> {
    return null as any;
  }

  public async userRegister(user: UserRegister): Promise<Auth> {
    return null as any;
  }

  public async userUpdate(id: string, user: UserUpdateInput): Promise<IUser> {
    return null as any;
  }

  public async userUpdateMyself(user: UserUpdateInput): Promise<Auth> {
    return null as any;
  }

}
