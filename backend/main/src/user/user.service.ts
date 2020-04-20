import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { FulltextFilter } from '../graphql/ts/types';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  public async findAndCount(filter?: FulltextFilter): Promise<[User[], number]> {
    const query: FindManyOptions<User> = {};
    if (filter?.query) {
      const like = `%${filter.query}%`;
      query.where = [
        {userName: Like(like)},
        {email: Like(like)},
        {firstName: Like(like)},
        {lastName: Like(like)},
      ];
    }
    if (filter?.pagination) {
      query.take = filter.pagination.limit;
      query.skip = filter.pagination.offset;
    }
    return this.userRepository.findAndCount(query);
  }
}
