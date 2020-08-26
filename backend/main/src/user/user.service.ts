import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {
  FulltextFilter,
  UserRegister,
  UserUpdateInput,
} from '../graphql/ts/types';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findAndCount(
    filter?: FulltextFilter,
  ): Promise<[User[], number]> {
    const query: FindManyOptions<User> = {};
    if (filter?.query) {
      const like = `%${filter.query}%`;
      query.where = [
        { userName: Like(like) },
        { email: Like(like) },
        { firstName: Like(like) },
        { lastName: Like(like) },
      ];
    }
    if (filter?.pagination) {
      query.take = filter.pagination.limit;
      query.skip = filter.pagination.offset;
    }
    return this.userRepository.findAndCount(query);
  }

  public async create(user: UserRegister): Promise<User> {
    const entity = await this.userRepository.create(user as DeepPartial<User>);
    await this.userRepository.save(entity);
    return entity;
  }

  public async findByUsernameOrEmail(
    userNameOrEmail: string,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  public async update(
    id: string,
    user: UserUpdateInput,
  ): Promise<User | undefined> {
    const result = await this.userRepository.update({ id }, user);
    if (result.affected === 0) {
      return undefined;
    }
    return this.findById(id);
  }
  public async checkEmailExists(email: string): Promise<boolean> {
    return (await this.userRepository.count({ where: { email } })) > 0;
  }

  public async checkUserNameExists(userName: string): Promise<boolean> {
    return (await this.userRepository.count({ where: { userName } })) > 0;
  }
}
