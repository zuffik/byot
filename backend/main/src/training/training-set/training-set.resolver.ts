import { Resolver } from '@nestjs/graphql';
import { BadRequestException, Inject } from '@nestjs/common';
import { TrainingSetService } from './training-set.service';
import {
  FulltextFilterForUser,
  Role,
  TrainingSetInput,
  TrainingSetList,
} from '../../graphql/ts/types';
import { JwtUserType } from '../../auth/decorators/jwt-user.decorator';
import { BaseResolver } from '../../helpers/BaseResolver';
import { TrainingSet } from './training-set.entity';

@Resolver('TrainingSet')
export class TrainingSetResolver extends BaseResolver {
  constructor(
    @Inject(TrainingSetService)
    private readonly trainingSetService: TrainingSetService,
  ) {
    super();
  }

  public async allTrainingSets(
    filter?: FulltextFilterForUser,
    user?: JwtUserType,
  ): Promise<TrainingSetList> {
    filter = filter || {};
    if (user.role === Role.USER) {
      filter.idUser = user.id;
    }
    return this.createList<TrainingSetList>(
      await this.trainingSetService.findAndCount(filter),
    );
  }

  public async trainingSet(
    id: string,
    user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(id),
    );
    await this.checkOwnership(trainingSet.owner, user);
    return trainingSet;
  }

  public async createTrainingSet(
    input: TrainingSetInput,
    user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = await this.trainingSetService.create(input, user.id);
    if (!trainingSet) {
      throw new BadRequestException('User does not exists!');
    }
    return trainingSet;
  }

  public async updateTrainingSet(
    id: string,
    input: TrainingSetInput,
    user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(id),
    );
    await this.checkOwnership(trainingSet.owner, user);
    return await this.trainingSetService.update(id, input);
  }
}
