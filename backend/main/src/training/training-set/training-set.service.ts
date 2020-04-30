import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingSet } from './training-set.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import {
  FulltextFilterForUser,
  TrainingSetInput,
} from '../../graphql/ts/types';
import { UserService } from '../../user/user.service';
import * as _ from 'lodash';

@Injectable()
export class TrainingSetService {
  constructor(
    @InjectRepository(TrainingSet)
    private readonly trainingSetRepository: Repository<TrainingSet>,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  public async findAndCount(
    filter?: FulltextFilterForUser,
  ): Promise<[TrainingSet[], number]> {
    let query: FindManyOptions<TrainingSet> = {};
    if (filter.idUser) {
      query.relations = ['owner'];
      query = _.set(query, ['where', 'owner', 'id'], filter.idUser);
    }
    if (filter.query) {
      query = _.set(query, ['where', 'label'], Like(`%${filter.query}%`));
    }
    if (filter.pagination) {
      query.take = filter.pagination.limit;
      query.skip = filter.pagination.offset;
    }
    return await this.trainingSetRepository.findAndCount(query);
  }

  public async findById(id: string): Promise<TrainingSet | undefined> {
    return await this.trainingSetRepository.findOne({
      where: { id },
    });
  }

  public async create(
    input: TrainingSetInput,
    ownerId: string,
  ): Promise<TrainingSet | undefined> {
    const user = await this.userService.findById(ownerId);
    if (!user) {
      return undefined;
    }
    const trainingSet = this.trainingSetRepository.create(input);
    trainingSet.owner = Promise.resolve(user);
    return await this.trainingSetRepository.save(trainingSet);
  }

  public async update(
    id: string,
    input: TrainingSetInput,
  ): Promise<TrainingSet | undefined> {
    const trainingSet = await this.findById(id);
    if (!trainingSet) {
      return undefined;
    }
    trainingSet.label = input.label;
    return await this.trainingSetRepository.save(trainingSet);
  }
}
